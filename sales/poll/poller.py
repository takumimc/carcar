import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
import sales_rest.models
from sales_rest.models import AutomobileVO

def get_automobile():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    automobiles = json.loads(response.content)

    for auto in automobiles['autos']:
        AutomobileVO.objects.update_or_create(
            import_href=auto['href'],
            vin=auto['vin'],
            defaults={'sold': auto['sold']},
        )



def poll(repeat=True):
    while True:
        print('Sales poller polling for data')
        try:
            # Write your polling logic, here
            # Do not copy entire file
            get_automobile()
        except Exception as e:
            print(e, file=sys.stderr)
        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
