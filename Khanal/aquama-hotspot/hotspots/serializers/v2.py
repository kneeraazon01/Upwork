"""Serializers for the API V2"""

from rest_framework import serializers

from hotspots.models import (
    Location,
    OpeningHour,
    AquamaMachine,
    AquamaSolutionType,
    AquamaPointOfSale,
    Image
)

# Generals serializers

class OwnedHyperlinkedModelSerializer(
        serializers.HyperlinkedModelSerializer
):
    """A Serializer that expose an "editable" field to say if the user
    that do the request is authorized to edit the object
    """
    editable = serializers.SerializerMethodField()
    
    def get_editable(self, obj):
        """If the object is editable by the user that do the request"""
        return self.context['request'].user == obj.owner


# API nested serializers

# Generic API nested serializers
class OpeningHourSerializerForLocation(
        serializers.ModelSerializer
):
    """Serializer of the OpeningHour model for nesting in Location"""
    class Meta:
        model = OpeningHour
        fields = (
            'opening_time',
            'closing_time',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
        )


class ImageNestedSerializer(
        OwnedHyperlinkedModelSerializer
):
    """Serializer for nested images"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v2:image-detail',
    )
    
    class Meta:
        model = Image
        fields = (
            'url',
            'editable',
            'image',
            'name',
            'description',
        )
        read_only_fields = (
            'editable',
        )


# For the big dump made from the locations
class SolutionTypeSerializerForAquamaMachineInLocation(
        serializers.HyperlinkedModelSerializer):
    """Serializer of the AquamaSolutionType model for nesting in
    AquamaMachine, nested itself in location"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v2:aquamasolutiontype-detail'
    )
    
    class Meta:
        model = AquamaSolutionType
        fields = (
            'url',
            'name',
            'hydro_enum_value',
        )


class AquamaMachineSerializerForLocation(
        OwnedHyperlinkedModelSerializer):
    """Serializer of the AquamaMachine model for nesting in Location"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v2:aquamamachine-detail',
    )
    aquama_solution_types = SolutionTypeSerializerForAquamaMachineInLocation(
        many=True,
    )
    images = ImageNestedSerializer(many=True)
    
    class Meta:
        model = AquamaMachine
        fields = [
            'url',
            'editable',
            'serial_number',
            'name',
            'bluetooth_name',
            'aquama_solution_types',
            'wwan_available',
            'rfid_reader_enabled',
            'images',
        ]
        read_only_fields = (
            'editable',
        )


# For the big dump made from the machines
class AquamaPointOfSaleSerializerForLocation(
        serializers.HyperlinkedModelSerializer):
    """Serializer of the AquamaPointOfSale model for nesting in
    Location"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v2:aquamapointofsale-detail',
    )
    
    class Meta:
        model = AquamaPointOfSale
        fields = (
            'url',
            'name',
        )


class LocationForAquamaMachineSerializer(
        OwnedHyperlinkedModelSerializer
):
    """Serializer of the Location model for nesting in
    AquamaMachine"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v2:location-detail',
    )

    opening_hours = OpeningHourSerializerForLocation(
        source='openinghour_set',
        many=True,
    )
    
    aquama_points_of_sale = AquamaPointOfSaleSerializerForLocation(
        source='aquamapointofsale_set',
        many=True,
    )
    images = ImageNestedSerializer(many=True)

    class Meta:
        model = Location
        fields = (
            'url',
            'editable',
            'name',
            'description',
            'opening_hours',
            'longitude',
            'latitude',
            'street',
            'npa',
            'city',
            'country',
            'floor',
            'additional_informations',
            'phone_number',
            'website',
            'created_on',
            'available_on',
            'images',
            'aquama_points_of_sale',
        )
        read_only_fields = (
            'editable',
        )


# API general serializers

class LocationSerializer(
        OwnedHyperlinkedModelSerializer
):
    """Serializer of the Location model"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v2:location-detail',
    )
    opening_hours = OpeningHourSerializerForLocation(
        source='openinghour_set',
        many=True,
    )

    images = serializers.HyperlinkedRelatedField(
        view_name='api_v2:image-detail',
        queryset=Image.objects.all(),
        many=True,
    )

    class Meta:
        model = Location
        fields = (
            'url',
            'editable',
            'name',
            'description',
            'opening_hours',
            'longitude',
            'latitude',
            'street',
            'npa',
            'city',
            'country',
            'floor',
            'additional_informations',
            'phone_number',
            'website',
            'created_on',
            'available_on',
            'images',
        )
        read_only_fields = (
            'editable',
        )

    def create(self, validated_data):
        """Overload the 'create()' method to manage nested OpeningHours"""
        # Extract opening hours data from validated data
        opening_hours_data = validated_data.pop('openinghour_set', [])
        # Extract images data from validated data
        images_data = validated_data.pop('images', [])
        # TODO: Manage images creation

        # Create the location
        location = Location.objects.create(
            **validated_data
        )
        # For each openg hour data, create an new opening hour linked
        # to the created location
        for opening_hour_data in opening_hours_data:
            OpeningHour.objects.create(
                location=location,
                **opening_hour_data,
            )
        return location

    def update(self, instance, validated_data):
        """Overload the 'update()' method to manage nested OpeningHours"""
        # Check if open_hours is provided
        if 'opening_hours' in validated_data.keys():
            # Extract opening hours data from validated data
            opening_hours_data = validated_data.pop('opening_hours')
            # Delete actual opening hours of this location
            instance.opening_hour_set.all().delete()
            # For each opening_hour_data, add a new Opening Hour
            for opening_hour_data in opening_hours_data:
                instance.opening_hour_set.create(
                    **opening_hour_data
                )

        # Check if images is provided
        if 'images' in validated_data.keys():
            # Extract images data from validated data
            images_data = validated_data.pop('images')
            # TODO: Manage images update

        # Update the rest of the fields
        instance.update(
            **validated_data
        )


class AquamaMachineSerializer(
        OwnedHyperlinkedModelSerializer
):
    """Serializer of the AquamaMachine model"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v2:aquamamachine-detail',
    )
    location = serializers.HyperlinkedRelatedField(
        view_name='api_v2:location-detail',
        queryset=Location.objects.all(),
    )
    aquama_solution_types = serializers.HyperlinkedRelatedField(
        view_name='api_v2:aquamasolutiontype-detail',
        queryset=AquamaSolutionType.objects.all(),
        many=True
    )
    images = serializers.HyperlinkedRelatedField(
        view_name='api_v2:image-detail',
        queryset=Image.objects.all(),
        many=True,
    )
    
    class Meta:
        model = AquamaMachine
        fields = (
            'url',
            'editable',
            'location',
            'serial_number',
            'name',
            'bluetooth_name',
            'aquama_solution_types',
            'wwan_available',
            'rfid_reader_enabled',
            'images',
            'editable',
        )
        read_only_fields = (
            'editable',
        )


class AquamaSolutionTypeSerializer(
        serializers.HyperlinkedModelSerializer):
    """Serializer of the AquamaSolutionType model"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v2:aquamasolutiontype-detail',
    )
    class Meta:
        model = AquamaSolutionType
        fields = (            
            'url',
            'name',
            'hydro_enum_value',
        )


class AquamaPointOfSaleSerializer(
        OwnedHyperlinkedModelSerializer
):
    """Serializer of the AquamaPointOfSale model"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v2:aquamapointofsale-detail',
    )
    location = serializers.HyperlinkedRelatedField(
        view_name='api_v2:location-detail',
        queryset=Location.objects.all(),
    )
    
    class Meta:
        model = AquamaPointOfSale
        fields = (
            'url',
            'editable',
            'name',
            'location',
        )
        read_only_fields = (
            'editable',
        )


class ImageSerializer(OwnedHyperlinkedModelSerializer):
    """Serializer of the Image model"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v2:image-detail',
    )
    class Meta:
        model = Image
        fields = (
            'url',
            'editable',
            'image',
            'name',
            'description',
        )
        read_only_fields = (
            'editable',
        )


# Big dump serializers
class AllFromLocationSerializer(
        OwnedHyperlinkedModelSerializer
):
    """All data from a location.

    With nested OpeningHour, AquamaMachine, AquamaPointOfSale,
    AquamaSolutionType, and Images
    """
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v2:location-detail',
    )
    opening_hours = OpeningHourSerializerForLocation(
        source='openinghour_set',
        many=True,
    )
    aquama_machines = AquamaMachineSerializerForLocation(
        source='aquamamachine_set',
        many=True,
    )
    aquama_points_of_sale = AquamaPointOfSaleSerializerForLocation(
        source='aquamapointofsale_set',
        many=True,
    )
    images = ImageNestedSerializer(many=True)
    
    class Meta:
        model = Location
        fields = (
            'url',
            'editable',
            'name',
            'description',
            'opening_hours',
            'longitude',
            'latitude',
            'street',
            'npa',
            'city',
            'country',
            'floor',
            'additional_informations',
            'phone_number',
            'website',
            'created_on',
            'available_on',
            'images',
            'aquama_machines',
            'aquama_points_of_sale',
        )
        read_only_fields = (
            'editable',
        )


class AllFromAquamaMachineSerializer(
        OwnedHyperlinkedModelSerializer
):
    """All data from an AquamaMachine.

    With nested Location, OpeningHour and AquamaPointOfSale in
    Location, AquamaSolutionType, and Images
    """
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v2:aquamamachine-detail',
    )

    aquama_solution_types = SolutionTypeSerializerForAquamaMachineInLocation(
        many=True,
    )

    location = LocationForAquamaMachineSerializer()

    images = ImageNestedSerializer(many=True)

    class Meta:
        model = AquamaMachine
        fields = (
            'url',
            'editable',
            'serial_number',
            'name',
            'bluetooth_name',
            'origin',
            'aquama_solution_types',
            'wwan_available',
            'rfid_reader_enabled',
            'location',
            'images',
        )
        read_only_fields = (
            'editable',
        )
