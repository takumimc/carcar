from django.contrib import admin
from .models import Sale

# Register your models here.
@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    pass
