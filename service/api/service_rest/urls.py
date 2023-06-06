from django.urls import path
from .views import list_technicians, list_appointments, edit_appointment


urlpatterns = [
    path('technicians/', list_technicians, name="list_technicians"),
    path('technicians/<int:id>/', list_technicians, name="delete_technician"),
    path('appointments/', list_appointments, name="list_appointments"),
    path('appointments/<int:id>/', edit_appointment, name="delete_appointment"),
    path('appointments/<int:id>/<str:status>/', edit_appointment, name="edit_appointment"),
]
