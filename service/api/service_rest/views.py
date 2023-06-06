from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.db import IntegrityError
import json
from .models import Technician, Appointment, AutomobileVO
from common.json import ModelEncoder

# Create your views here.
class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ['first_name','last_name','employee_id','id']


class AppointmentEncoder(ModelEncoder):
    model= Appointment
    properties =['id', 'vip', 'date_time','reason','status','vin','customer','technician']
    encoders = {"technician": TechnicianEncoder()}


@require_http_methods(["GET","POST","DELETE"])
def list_technicians(request, id=None):
        if request.method == "GET":
            try:
                technicians = Technician.objects.all()
                return JsonResponse({"technicians": technicians},encoder=TechnicianEncoder,safe=False)
            except:
                return JsonResponse({"message": "Error getting technician info"}, status=400)

        elif request.method =="DELETE":
            count, _ = Technician.objects.filter(id=id).delete()
            return JsonResponse({'deleted': count > 0})

        else: #POST
            try:
                body = json.loads(request.body)
                technician = Technician.objects.create(**body)
                return JsonResponse(technician,encoder=TechnicianEncoder,safe=False)
            except IntegrityError as e:
                if 'unique constraint' in e.args[0]:
                    return JsonResponse({"message": "Employee ID already used. Choose different ID."}, status=400)
            except:
                return JsonResponse({"message": 'Error creating employee'}, status=400)


@require_http_methods(['GET','POST'])
def list_appointments(request):
    if request.method == 'GET':
        try:
            appointments = Appointment.objects.all()
            return JsonResponse({'appointments':appointments}, encoder=AppointmentEncoder,safe=False)
        except:
            return JsonResponse({'message': 'Error getting appointments'}, status=400)

    else: #POST
        body = json.loads(request.body)
        try:
            technician = Technician.objects.get(id=body['technician'])
        except Technician.DoesNotExist:
            return JsonResponse({'message': 'Technician does not exist'})

        body['technician']= technician
        try:
            vip_check = AutomobileVO.objects.get(vin=body['vin'])
            body['vip'] = True
        except AutomobileVO.DoesNotExist:
            body['vip'] = False
        try:
            appointment = Appointment.objects.create(**body)
        except IntegrityError as e:
            if 'unique constraint' in e.args[0]:
                return JsonResponse({"message": "VIN already used. Choose another VIN."}, status=400)
        return JsonResponse(appointment,encoder=AppointmentEncoder,safe=False)


@require_http_methods(['DELETE','PUT'])
def edit_appointment(request, id, status=None):
    if request.method == 'PUT' and status == 'finish':
        try:
            appointment = Appointment.objects.get(id=id)
        except Appointment.DoesNotExist:
            return JsonResponse({'message':'Invalid appointment ID'}, status=400)
        appointment.status='Finished'
        appointment.save()
        return JsonResponse(appointment,encoder=AppointmentEncoder,safe=False)

    elif request.method == 'PUT' and status == 'cancel':
        try:
            appointment = Appointment.objects.get(id=id)
        except Appointment.DoesNotExist:
            return JsonResponse({'message':'Invalid appointment ID'},status=400)
        appointment.status='Canceled'
        appointment.save()
        return JsonResponse(appointment,encoder=AppointmentEncoder,safe=False)

    else: #DELETE
        count, _ = Appointment.objects.filter(id=id).delete()
        return JsonResponse({'deleted': count > 0})
