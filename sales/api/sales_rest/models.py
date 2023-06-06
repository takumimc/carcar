from django.db import models

# Create your models here.
class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.PositiveIntegerField(unique=True)

class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=15)

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        on_delete=models.CASCADE
    )
    salesperson = models.ForeignKey(
        Salesperson,
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
    )
    price = models.PositiveIntegerField()
