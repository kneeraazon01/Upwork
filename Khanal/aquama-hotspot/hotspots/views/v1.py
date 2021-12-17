from django.shortcuts import render
from rest_framework import viewsets

from hotspots.models import (
    Location,
    OpeningHour,
    AquamaMachine,
    AquamaSolutionType,
    AquamaPointOfSale,
    Image
)

from hotspots.serializers.v1 import (
    LocationSerializer,
    OpeningHourSerializer,
    AquamaMachineSerializer,
    AquamaSolutionTypeSerializer,
    AquamaPointOfSaleSerializer,
    ImageSerializer,
)

# API views
class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    """API view of Location model"""
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class OpeningHourViewSet(viewsets.ReadOnlyModelViewSet):
    """API view of OpeningHour model"""
    queryset = OpeningHour.objects.all()
    serializer_class = OpeningHourSerializer


class AquamaMachineViewSet(viewsets.ReadOnlyModelViewSet):
    """API view of AquamaMachine model"""
    queryset = AquamaMachine.objects.all()
    serializer_class = AquamaMachineSerializer


class AquamaSolutionTypeViewSet(viewsets.ReadOnlyModelViewSet):
    """API view of AquamaSolutionType model"""
    queryset = AquamaSolutionType.objects.all()
    serializer_class = AquamaSolutionTypeSerializer


class AquamaPointOfSaleViewSet(viewsets.ReadOnlyModelViewSet):
    """API view of AquamaPointOfSale model"""
    queryset = AquamaPointOfSale.objects.all()
    serializer_class = AquamaPointOfSaleSerializer


class ImageViewSet(viewsets.ReadOnlyModelViewSet):
    """API view of Image model"""
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    
# HTML views
