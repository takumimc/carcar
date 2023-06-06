from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    AutomobileVOEncoder,
    SalespersonEncoder,
    CustomerEncoder,
    SaleEncoder,
)

from .models import AutomobileVO, Salesperson, Customer, Sale

# Create your views here.
@require_http_methods(["GET", "POST"])
def api_salesperson(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )

@require_http_methods(["DELETE"])
def api_salesperson_delete(request, pk):
    count, _ = Salesperson.objects.filter(id=pk).delete()
    return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )

@require_http_methods(["DELETE"])
def api_customer_delete(request, pk):
    count, _ = Customer.objects.filter(id=pk).delete()
    return JsonResponse({"deleted": count > 0})
