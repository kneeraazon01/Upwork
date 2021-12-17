"""Provide all views for the V2 API"""

from django.shortcuts import render
from rest_framework import viewsets

from django.shortcuts import get_object_or_404
from rest_framework.permissions import (
    DjangoModelPermissionsOrAnonReadOnly,
)
from rest_framework.response import Response

from hotspots.models import (
    Location,
    OpeningHour,
    AquamaMachine,
    AquamaSolutionType,
    AquamaPointOfSale,
    Image,
)

from hotspots.serializers.v2 import (
    LocationSerializer,
    AquamaMachineSerializer,
    AquamaSolutionTypeSerializer,
    AquamaPointOfSaleSerializer,
    ImageSerializer,
    AllFromLocationSerializer,
    AllFromAquamaMachineSerializer,
)

from hotspots.permissions import (
    IsOwneOrAdminrToModifyObject,
)


# Generic viewsets

class OwnedModelViewSet(viewsets.ModelViewSet):
    """A ModelViewSet that manage owned objects"""
    permission_classes = [
        IsOwneOrAdminrToModifyObject&DjangoModelPermissionsOrAnonReadOnly
    ]

    def list(self, request):
        """Return the serialized list of objects and pass the request to the
        serializer as context"""
        queryset = self.get_queryset()
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(
            queryset,
            many=True,
            context={
                'request': request,
            }
        )
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        """Return the serialized object and pass the request to the serializer
        as context
        """
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, pk=pk)
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(
            obj,
            context={
                'request': request,
            }
        )
        return Response(serializer.data)
        

# API views
class LocationViewSet(OwnedModelViewSet):
    """API view of Location model"""
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [
        IsOwneOrAdminrToModifyObject&DjangoModelPermissionsOrAnonReadOnly
    ]


class AquamaMachineViewSet(OwnedModelViewSet):
    """API view of AquamaMachine model"""
    queryset = AquamaMachine.objects.all()
    serializer_class = AquamaMachineSerializer
    permission_classes = [
        IsOwneOrAdminrToModifyObject&DjangoModelPermissionsOrAnonReadOnly
    ]


class AquamaSolutionTypeViewSet(viewsets.ReadOnlyModelViewSet):
    """API view of AquamaSolutionType model"""
    queryset = AquamaSolutionType.objects.all()
    serializer_class = AquamaSolutionTypeSerializer


class AquamaPointOfSaleViewSet(viewsets.ReadOnlyModelViewSet):
    """API view of AquamaPointOfSale model"""
    queryset = AquamaPointOfSale.objects.all()
    serializer_class = AquamaPointOfSaleSerializer


class ImageViewSet(OwnedModelViewSet):
    """API view of Image model"""
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [
        IsOwneOrAdminrToModifyObject&DjangoModelPermissionsOrAnonReadOnly
    ]


class AllFromLocationViewSet(viewsets.ReadOnlyModelViewSet):
    """All data from a location.

    With nested OpeningHour, AquamaMachine, AquamaPointOfSale,
    AquamaSolutionType, and Images"""
    queryset = Location.objects.all()
    serializer_class = AllFromLocationSerializer


class AllFromAquamaMachineViewSet(
        viewsets.ReadOnlyModelViewSet
):
    """All data from a AquamaMachine.

    With nested Location, OpeningHour and AquamaPointOfSale in
    Location, AquamaSolutionType, and Images
    """
    queryset = AquamaMachine.objects.all()
    serializer_class = AllFromAquamaMachineSerializer
