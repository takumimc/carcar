import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here. Ignore vs-code error hinting
# from service_rest.models import Something
from service_rest.models import AutomobileVO

def poll(repeat=True):
    while True:
        print('Service poller polling for data')
        try:
            # Write your polling logic, here
            # Do not copy entire file
            response = requests.get('http://inventory-api:8000/api/automobiles/')
            automobiles = response.json()
            # print('request success')
            # print(automobiles)
            for automobile in automobiles['autos']:
                AutomobileVO.objects.update_or_create(
                    vin=automobile['vin'],
                    sold=automobile['sold']
                )
        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(20)


if __name__ == "__main__":
    poll()
