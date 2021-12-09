from django.urls import path
from . import views

urlpatterns = [
    path("invent/", views.productListView, name="register"),
]
