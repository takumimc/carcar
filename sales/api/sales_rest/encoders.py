from common.json import ModelEncoder

from .models import Salesperson, Customer, AutomobileVO, Sale

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["import_href", "vin", "sold"]

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = ["first_name", "last_name", "employee_id"]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name", "address", "phone_number"]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = ["automobile", "salesperson", "customer", "price"]
    encoder = {
        "automobile": AutomobileVO(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }
