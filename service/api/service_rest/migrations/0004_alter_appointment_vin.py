# Generated by Django 4.0.3 on 2023-06-07 00:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_appointment_vip'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='vin',
            field=models.CharField(max_length=100),
        ),
    ]
