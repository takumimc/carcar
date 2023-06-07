# CarCar

Team:

* Ian McIntyre - Automobile Service
* Person 2 - Which microservice?
## How to Run this App
### Requires Docker,Git, and Node.js

1.Fork this repository and clone into desired local directory using command below
```
git clone -repository https clone link here-
```
2.Run the following commands in the clone repository to build and run using Docker.
Note: React container can take a while to properly run. Typically takes a few minutes

```
docker volume create beta-data
docker-compose build
docker-compose up
```

3.Once everything is built and running CarCar app can be viewed at http://localhost:3000/

![Img](/images/test.png)

## Design

## Inventory microservice


## Service microservice

This portion of the app is designed to create and manage service repair appointments for customer vehicles.
This microservice takes in automobile data from the inventory microservice and creates AutoMobileVO that are used to determine VIP status when scheduling appointments.

The various API endpoints and models are listed below:

### Technician Model
This model contains data for the technician that is assigned to an appointment.
The various endpoints can be accessed according to this table
|Action|Method|URL|
| ----------- | ----------- | ----------- |
|List Technicians|GET|http://localhost:8080/api/technicians/|
|Create Technician|POST|http://localhost:8080/api/technicians/|
|Delete a Technician|DELETE|http://localhost:8080/api/technicians/id|

The Create Technician action takes a POST request with a JSON body in this format:
```
{
	"first_name": "Raggy",
	"last_name": "Timbucktooth",
	"employee_id": "Ragtooth"
}
```
Employee ID is unique to each technician and will not create if it is already in use by another technician. On this specific error it will return the following JSON:
```
{
	"message": "Employee ID already used. Choose different ID."
}
```
Upon a successful request you should receive JSON data structured in this way:
```
{
	"first_name": "Raggy",
	"last_name": "Timbucktooth",
	"employee_id": "Ragtooth",
	"id": 49
}
```


The List Technicians action requires no JSON input and once the GET request was properly received should return JSON data structured in this way containing a list of all created technicians:
```
{
	"technicians": [
		{
			"first_name": "Testguy",
			"last_name": "Testlast",
			"employee_id": "mrcool",
			"id": 1
		},
		{
			"first_name": "number2",
			"last_name": "last2",
			"employee_id": "second",
			"id": 2
		},
		{
			"first_name": "Raggy",
			"last_name": "Timbucktooth",
			"employee_id": "Ragtooth",
			"id": 49
		}
	]
}
```

The Delete Technician action takes a DELETE request with an id number corresponding to the technician ni the url. Following the previous examples a DELETE request with the URL : http://localhost:8080/api/technicians/49 will delete our employee Raggy Timbucktooth and return JSON data formatted in the following way:
```
{
	"deleted": true
}
```
"deleted": true was return signaling a successful deletion. "deleted":false will return if nothing was deleted

### Appointments Model
This model contains data pertaining to an appointment and uses technician as a foreign key to the Technician model.

The various endpoints can be accessed according to this table
|Action|Method|URL|
| ----------- | ----------- | ----------- |
|List all Appointments|GET|http://localhost:8080/api/appointments/|
|Create an Appointment|POST|http://localhost:8080/api/appointments/|
|Delete an Appointment|DELETE|http://localhost:8080/api/appointments/id|
|Set appointment status to "finished"|PUT|http://localhost:8080/api/appointments/id/finish/|
|Set appointment status to "canceled"|PUT|http://localhost:8080/api/appointments/id/cancel/|

The List all Appointment actions takes a Get request and requires no input. Once properly received it returns a list of all appointments structured as the following:
```
{
	"appointments": [
		{
			"id": 35,
			"vip": false,
			"date_time": "2023-06-13T06:48:00+00:00",
			"reason": "123312",
			"status": "Scheduled",
			"vin": "`12`12",
			"customer": "`12`12`12",
			"technician": {
				"first_name": "fours",
				"last_name": "foroice",
				"employee_id": "5",
				"id": 16
			}
		},
		{
			"id": 16,
			"vip": false,
			"date_time": "2023-06-26T22:05:00+00:00",
			"reason": "test",
			"status": "Finished",
			"vin": "testvin",
			"customer": "test person",
			"technician": {
				"first_name": "Testguy",
				"last_name": "Testlast",
				"employee_id": "mrcool",
				"id": 1
			}
		}
	]
}
```

The Create an Appointment takes a POST request with a JSON body structured as:
```
{
	"date_time": "2023-06-19T01:50:00.000Z",
	"reason": "Testing",
	"vin": "2323323",
	"customer": "testomer",
	"technician": 1
	}
```
Some things to note:
date_time takes an ISO formatted datetime string
technician takes a technician ID number to retrive data from created technicians

Once successfull it should return a preview of what the created appointment looks like:
```
{
	"id": 14,
	"vip": false,
	"date_time": "2023-06-19T01:50:00.000Z",
	"reason": "Testing",
	"status": "Scheduled",
	"vin": "2323323",
	"customer": "testomer",
	"technician": {
		"first_name": "Testguy",
		"last_name": "Testlast",
		"employee_id": "mrcool",
		"id": 1
	}
}
```

The Delete an Appointment takes a DELETE request with the id taken from the url of the corresponding appointment. Returns JSON data.
```
{
	"deleted": true
}
```
"deleted": true was return signaling a successful deletion. "deleted":false will return if nothing was deleted

The Set appointment status actions will either set the current status of an appointment to either "Finished" or "Canceled" depending on the URL. Default status is "Scheduled" upon creation.
This action takes a PUT request to a URL that specifys both the id number of the appointment and whether it wil "finish" or "cancel" an appointment.
Ending the request URL with /finish/ will set status to 'finished' and the opposite for /cancel/.
Upon success JSON data showing the updated appointment will be returned:
```
 {
	"id": 1,
	"date_time": "2023-06-06T17:38:58+00:00",
	"reason": "Testing",
	"status": "Canceled",
	"vin": "123123",
	"customer": "testomer",
	"technician": {
		"first_name": "Testguy",
		"last_name": "Testlast",
		"employee_id": "mrcool",
		"id": 1
	}
}
```


### AutomobileVO Model
This model contains data pertaining to an appointment and uses technician as a foreign key to the Technician model.

The various endpoints can be accessed according to this table
|Action|Method|URL|
| ----------- | ----------- | ----------- |
|List Technicians|GET|http://localhost:8080/api/technicians/|
|Create Technician|POST|http://localhost:8080/api/technicians/|
|Delete a Technician|DELETE|http://localhost:8080/api/technicians/id|



Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
