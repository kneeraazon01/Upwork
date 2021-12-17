from django.urls import path, include
from rest_framework import routers

from hotspots.views import v1 as views_v1
from hotspots.views import v2 as views_v2

# Router for the API V1 of this app
router_v1 = routers.DefaultRouter()
router_v1.register(
    r'location',
    views_v1.LocationViewSet,
)
router_v1.register(
    r'opening_hours',
    views_v1.OpeningHourViewSet,
)
router_v1.register(
    r'aquama_machines',
    views_v1.AquamaMachineViewSet,
)
router_v1.register(
    r'aquama_solution_type',
    views_v1.AquamaSolutionTypeViewSet,
)
router_v1.register(
    r'aquama_point_of_sale',
    views_v1.AquamaPointOfSaleViewSet,
)
router_v1.register(
    r'image',
    views_v1.ImageViewSet,
)

# Router for the API V2 of this app
router_v2 = routers.DefaultRouter()
router_v2.register(
    r'locations',
    views_v2.LocationViewSet,
)
router_v2.register(
    r'aquama_machines',
    views_v2.AquamaMachineViewSet,
)
router_v2.register(
    r'aquama_solution_types',
    views_v2.AquamaSolutionTypeViewSet,
)
router_v2.register(
    r'aquama_points_of_sale',
    views_v2.AquamaPointOfSaleViewSet,
)
router_v2.register(
    r'images',
    views_v2.ImageViewSet,
)
router_v2.register(
    r'all_from_locations',
    views_v2.AllFromLocationViewSet,
    basename='all_from_locations',
)
router_v2.register(
    r'all_from_machines',
    views_v2.AllFromAquamaMachineViewSet,
    basename='all_from_locations',
)

urlpatterns = [
    path('api/v1/', include((router_v1.urls, 'api_v1'))),
    path('api/v2/', include((router_v2.urls, 'api_v2'))),
]
