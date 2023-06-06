from django.urls import path

from .views import (
    api_salesperson,
    api_salesperson_delete,
)


urlpatterns = [
    path("salespeople/", api_salesperson, name="api_salesperson"),
    path("salespeople/<int:pk>", api_salesperson_delete, name="api_salesperson_delete"),
]
