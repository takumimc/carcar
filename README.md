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
|Delete a Technician|DELETE|http://localhost:8080/api/technicians/:id|

The Create Technician action takes a POST request with a JSON body in this format:
```
{
	"first_name": "Raggy",
	"last_name": "Timbucktooth",
	"employee_id": "Ragtooth"
}
```
Employee ID is unique to each technician and will not create if it is already in use by another technician. On this specific error it will return the follow JSON:
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

###Appointments Model
This model contains data pertaining to an appointment and uses technician as a foreign key to the Technician model.



Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
