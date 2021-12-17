"""Serializers for the API V1"""

from rest_framework import serializers

from hotspots.models import (
    Location,
    OpeningHour,
    AquamaMachine,
    AquamaSolutionType,
    AquamaPointOfSale,
    Image
)


# API nested serializers

class ImageNestedSerializer(
        serializers.HyperlinkedModelSerializer
):
    """Serializer for nested images"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v1:image-detail',
    )
    
    class Meta:
        model = Image
        fields = (
            'url',
            'image',
            'name',
            'description',
        )


class AquamaSolutionTypeSerializerForAquamaMachine(
        serializers.HyperlinkedModelSerializer):
    """Serializer of the AquamaSolutionType model for nesting in
    AquamaMachine"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v1:aquamasolutiontype-detail'
    )
    
    class Meta:
        model = AquamaSolutionType
        fields = (
            'url',
            'name',
            'hydro_enum_value',
        )


class AquamaMachineSerializerForLocation(
        serializers.HyperlinkedModelSerializer):
    """Serializer of the AquamaMachine model for nesting in Location"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v1:aquamamachine-detail',
    )
    aquama_solution_types = AquamaSolutionTypeSerializerForAquamaMachine(
        many=True,
    )
    images = ImageNestedSerializer(many=True)
    
    class Meta:
        model = AquamaMachine
        fields = [
            'url',
            'serial_number',
            'name',
            'bluetooth_name',
            'aquama_solution_types',
            'wwan_available',
            'rfid_reader_enabled',
            'images',
        ]


class AquamaPointOfSaleSerializerForLocation(
        serializers.HyperlinkedModelSerializer):
    """Serializer of the AquamaPointOfSale model for nesting in
    Location"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v1:aquamapointofsale-detail',
    )
    
    class Meta:
        model = AquamaPointOfSale
        fields = (
            'url',
            'name',
        )


class OpeningHourSerializerForLocation(
        serializers.HyperlinkedModelSerializer):
    """Serializer of the OpeningHour model for nesting in Location"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v1:openinghour-detail',
    )
    
    class Meta:
        model = OpeningHour
        fields = (
            'url',
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


class LocationSerializerForPointOfSale(
        serializers.HyperlinkedModelSerializer):
    """Serializer of the Location model for nesting in Point of sale"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v1:location-detail',
    )
    
    class Meta:
        model = Location
        fields = (
            'url',
            'name',
            'description',
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


class LocationSerializerForAquamaMachine(
        serializers.HyperlinkedModelSerializer):
    """Serializer of the Location model for nesting in AquamaMachine"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v1:location-detail',
    )
    
    class Meta:
        model = Location
        fields = (
            'url',
            'name',
            'description',
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


# API general serializers
class OpeningHourSerializer(serializers.HyperlinkedModelSerializer):
    """Serializer of the OpeningHour model"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v1:openinghour-detail',
    )
    location = serializers.HyperlinkedIdentityField(
        view_name='api_v1:location-detail',
    )
    
    class Meta:
        model = OpeningHour
        fields = (
            'url',
            'opening_time',
            'closing_time',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
            'location',
        )


class AquamaMachineSerializer(serializers.HyperlinkedModelSerializer):
    """Serializer of the AquamaMachine model"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v1:aquamamachine-detail',
    )
    location = LocationSerializerForAquamaMachine()
    aquama_solution_types = AquamaSolutionTypeSerializerForAquamaMachine(
        many=True
    )
    images = ImageNestedSerializer(many=True)
    
    class Meta:
        model = AquamaMachine
        fields = [
            'url',
            'location',
            'serial_number',
            'name',
            'bluetooth_name',
            'aquama_solution_types',
            'wwan_available',
            'rfid_reader_enabled',
            'images',
        ]


class AquamaSolutionTypeSerializer(
        serializers.HyperlinkedModelSerializer):
    """Serializer of the AquamaSolutionType model"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v1:aquamasolutiontype-detail',
    )
    class Meta:
        model = AquamaSolutionType
        fields = (            
            'url',
            'name',
            'hydro_enum_value',
        )


class LocationSerializer(serializers.HyperlinkedModelSerializer):
    """Serializer of the Location model"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v1:location-detail',
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


class AquamaPointOfSaleSerializer(serializers.HyperlinkedModelSerializer):
    """Serializer of the AquamaPointOfSale model"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v1:aquamapointofsale-detail',
    )
    location = LocationSerializerForPointOfSale(
        required=False,
    )
    
    class Meta:
        model = AquamaPointOfSale
        fields = (
            'url',
            'name',
            'location',
        )


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    """Serializer of the Image model"""
    url = serializers.HyperlinkedIdentityField(
        view_name='api_v1:image-detail',
    )
    class Meta:
        model = Image
        fields = (
            'url',
            'image',
            'name',
            'description',
        )
