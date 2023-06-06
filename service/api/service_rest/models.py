from django.db import models

# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.employee_id}"


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=100, default='Scheduled')
    vin = models.CharField(max_length=100, unique=True)
    customer = models.CharField(max_length=100)
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return f"{self.id}"


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=100, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.id}"
