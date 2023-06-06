from django.urls import path

from .views import (
    api_salesperson,
    api_salesperson_delete,
    api_customers,
    api_customer_delete,
    api_sales,
    api_sales_delete,
)


urlpatterns = [
    path("salespeople/", api_salesperson, name="api_salesperson"),
    path("salespeople/<int:pk>", api_salesperson_delete, name="api_salesperson_delete"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:pk>/", api_customer_delete, name="api_customer_delete"),
    path("sales/", api_sales, name="api_sales"),
    path("sales/<int:pk>/", api_sales_delete, name="api_sales_delete"),
]
