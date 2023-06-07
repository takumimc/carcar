# CarCar

Team:

* **Ian McIntyre** - Automobile Service
* **Kevin Nguyen** - Automobile Sales

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

![Img](/images/CarCarWebsite.png)

## Design

The app is made of 3 different microservices that interact with one another and then is rendered and displayed through React.

![Img](/images/CarCar_App_Diagram.png)

## Inventory microservice

This portion of the app manages the manufacturers,automobiles, and vehicle models in our inventory.

### Manufacturer Model
The various endpoints can be accessed according to this table
|Action|Method|URL|
| ----------- | ----------- | ----------- |
|List Manufacturer|GET|http://localhost:8100/api/manufacturers/|
|Create Manufacturer|POST|	http://localhost:8100/api/manufacturers/|
|Delete a Manufacturer|DELETE|http://localhost:8100/api/manufacturers/id/|
|Update a Manufacturer|PUT|http://localhost:8100/api/manufacturers/id/|
|Get a Manufacturer|POST|http://localhost:8100/api/manufacturers/id/|

- The List Manufacturer takes a GET request and returns JSON data for all the created manufacturers:
```
{
	"manufacturers": [
		{
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Test manfu"
		},
		{
			"href": "/api/manufacturers/2/",
			"id": 2,
			"name": "manufact"
		},
		{
			"href": "/api/manufacturers/3/",
			"id": 3,
			"name": "adsfasfdsadf"
		}
	]
}
```

- The Create Manufacturer action takes a POST request with JSON body like so:
```
{
  "name": "Chrysler"
}
```
Upon creation it returns a preview of the JSON data:
```
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```

- The Delete Manufacturer action takes a DELETE request and id from the URL to delete the matching manufacturer. Returns JSON data upon deletion:
```
{
	"id": null,
	"name": "Test manfu"
}
```

- The Update a Manufacturer action takes a PUT request and id from the URL as well as JSON body data to update the information of the matching manufacturer:
```
{
  "name": "Christler"
}
```
Returns updated JSON data preview:
```
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Christler"
}
```

- The Get a Manufacturer action  takes a POST request and id from the URL to get the JSON data for the matching manufacturer:
```
{
	"href": "/api/manufacturers/1/",
	"id": 1,
	"name": "Test manfu"
}
```


### Vehicle Model
The various endpoints can be accessed according to this table
|Action|Method|URL|
| ----------- | ----------- | ----------- |
|List Vehicle models|GET|http://localhost:8100/api/models/|
|Create Vehicle model|POST|	http://localhost:8100/api/models/|
|Delete a Vehicle model|DELETE|http://localhost:8100/api/models/id/|
|Update a Vehicle model|PUT|http://localhost:8100/api/models/id/|
|Get a Vehicle model|POST|http://localhost:8100/api/models/id/|

- List Vehicle action takes a GET request with no input and returns JSON data for all the vehicles formatted this way:
```
{
	"models": [
		{
			"href": "/api/models/2/",
			"id": 2,
			"name": "Sebring",
			"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
			"manufacturer": {
				"href": "/api/manufacturers/1/",
				"id": 1,
				"name": "Test manfu"
			}
		},
        {
			"href": "/api/models/8/",
			"id": 8,
			"name": "last test",
			"picture_url": "https://mks.io/meat-taco",
			"manufacturer": {
				"href": "/api/manufacturers/3/",
				"id": 3,
				"name": "adsfasfdsadf"
			}
		}
	]
}
```

- Create a Vehicle takes a POST request with JSON data formatted like so:
```
{
  "name": "Test 2",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
```
Some things to note:
1. "manufacturer_id" takes an integer input that corresponds to the desired manufacturer object

Upon successful creation a preview JSON will be returned:
```
{
	"href": "/api/models/4/",
	"id": 4,
	"name": "Test 2",
	"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Test manfu"
	}
}
```

- Delete a Vehicle takes a DELETE request with the corresponding vehicle id in the url. Returns JSON formatted:
```
{
	"id": null,
	"name": "Sebring",
	"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Test manfu"
	}
}
```

- Update vehicle takes a PUT request with the corresponding vehicle id in the url and JSON data formatted:
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}
```
Returns a preview of the updated JSON:
```
{
	"href": "/api/models/1/",
	"id": 1,
	"name": "Sebring",
	"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Test manfu"
	}
}
```

- Get a vehicle takes a GET request with the corresponding vehicle id in the url and returns JSON for the single vehicle that matches the ID:
```
{
	"href": "/api/models/1/",
	"id": 1,
	"name": "Test vehicle",
	"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Test manfu"
	}
}
```

### Automobile Model
The various endpoints can be accessed according to this table
|Action|Method|URL|
| ----------- | ----------- | ----------- |
|List Automobiles|GET|http://localhost:8100/api/automobiles//|
|Create Automobile|POST|http://localhost:8100/api/automobiles/|
|Delete an Automobile|DELETE|http://localhost:8100/api/automobiles/vin/|
|Update an Automobile|PUT|http://localhost:8100/api/automobiles/vin/|
|Get an Automobile|GET|http://localhost:8100/api/automobiles/vin/|

- The List Automobile action takes a GET request with no input and returns JSON data containing all the created automobiles:
```
{
	"autos": [
		{
			"href": "/api/automobiles/123123/",
			"id": 1,
			"color": "Red",
			"year": 1990,
			"vin": "123123",
			"model": {
				"href": "/api/models/2/",
				"id": 2,
				"name": "Sebring",
				"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
				"manufacturer": {
					"href": "/api/manufacturers/1/",
					"id": 1,
					"name": "Test manfu"
				}
			},
			"sold": false
		},
            		{
			"href": "/api/automobiles/2321C5FB2AN120174/",
			"id": 7,
			"color": "red",
			"year": 2012,
			"vin": "2321C5FB2AN120174",
			"model": {
				"href": "/api/models/2/",
				"id": 2,
				"name": "Sebring",
				"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
				"manufacturer": {
					"href": "/api/manufacturers/1/",
					"id": 1,
					"name": "Test manfu"
				}
			},
			"sold": false
		}
	]
}
```

- Create Automobile takes a POST request with JSON body data formatted:
```
{
  "color": "red",
  "year": 2012,
  "vin": "2321C5FB2AN120174",
  "model_id": 2
}
```
Returns JSON preview:
```
{
	"href": "/api/automobiles/2321C5FB2AN120174/",
	"id": 7,
	"color": "red",
	"year": 2012,
	"vin": "2321C5FB2AN120174",
	"model": {
		"href": "/api/models/2/",
		"id": 2,
		"name": "Sebring",
		"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Test manfu"
		}
	},
	"sold": false
}
```

- Delete Automobile takes a DELETE request with the automobile VIN number in the url to delete the specific automobile with that VIN.

- Update an Automobile takes a PUT request with the VIN number in the url and JSON body data to update the automobile with a matching VIN number:
```
{
  "color": "red",
  "year": 2012,
  "sold": true
}
```
Returns updated JSON:
```
{
	"href": "/api/automobiles/232323/",
	"id": 6,
	"color": "red",
	"year": 2012,
	"vin": "232323",
	"model": {
		"href": "/api/models/5/",
		"id": 5,
		"name": "Test create",
		"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Test manfu"
		}
	},
	"sold": true
}
```

- Get an automobile takes a GET request with a VIN number from the URL to get details pertaining to that specific automobile and returns JSON like so:
```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  },
  "sold": false
}
```

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


- The Create Technician action takes a POST request with a JSON body in this format:
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


- The List Technicians action requires no JSON input and once the GET request was properly received should return JSON data structured in this way containing a list of all created technicians:
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

- The Delete Technician action takes a DELETE request with an id number corresponding to the technician ni the url. Following the previous examples a DELETE request with the URL : http://localhost:8080/api/technicians/49 will delete our employee Raggy Timbucktooth and return JSON data formatted in the following way:
```
{
	"deleted": true
}
```
"deleted": true was returned signaling a successful deletion. "deleted":false will return if nothing was deleted

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

- The List all Appointment actions takes a Get request and requires no input. Once properly received it returns a list of all appointments structured as the following:
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

- The Create an Appointment takes a POST request with a JSON body structured as:
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
1. date_time takes an ISO formatted datetime string.
2. technician takes a technician ID number to retrive data from created technicians.


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
Some things to note:
1. A couple fields are automatically generated.
2. Upon creation "status" is set to "Scheduled". This can be changed with "set appointment" actions.
3. Upon creation a "vip" value is generated. If the vin provided matches a vin from one of our AutomobileVO objects then "vip" is set to true. Otherwise it is false


- The Delete an Appointment takes a DELETE request with the id taken from the url of the corresponding appointment. Returns JSON data.
```
{
	"deleted": true
}
```
"deleted": true was returned signaling a successful deletion. "deleted":false will return if nothing was deleted


- The Set appointment status actions will either set the current status of an appointment to either "Finished" or "Canceled" depending on the URL. Default status is "Scheduled" upon creation.
This action takes a PUT request to a URL that specifys both the id number of the appointment and whether it wil "finish" or "cancel" an appointment.
Ending the request URL with /finish/ will set the status to 'finished' and the opposite for /cancel/.
Upon success JSON data showing the updated appointment will be returned:
```
{
	"id": 35,
	"vip": false,
	"date_time": "2023-06-13T06:48:00+00:00",
	"reason": "123312",
	"status": "Canceled",
	"vin": "`12`12",
	"customer": "`12`12`12",
	"technician": {
		"first_name": "fours",
		"last_name": "foroice",
		"employee_id": "5",
		"id": 16
	}
}
```


### AutomobileVO Model
This model contains data pertaining to a value object that is created from data being polled from the Inventory microservice every 20 seconds. The 20 second poll rate means there is a 20 second window in which an automobile is being added to the inventory and an appointment being made where the vip status will be incorrectly assigned. It should be a short enough poll that it isn't an issue, but the poll rate can be adjusted as needed in /service/api/poll/poller.py/.

This model contains two fields "vin" and "sold". The reason we are automatically generating objects from the Inventory is because we want to be able to assign an appointment a VIP value.
Under the assumption that a customer that is making an appointment has already bought the vehicle means if the "vin" in one of our appointments matches a "vin" in one of our AutomobileVO objects we can assume the car has been sold and to treat that as a VIP appointment.


## Sales microservice

This microservice is designed to create and manage sales through creating and displaying customers, salespeople and sales of different automobiles.
To access the inventory of automobiles, the service polls data from the Inventory microservice using a poller to grab automobiles from the inventory and create an AutomobileVO within our microservice.

The various API endpoints and models are listed below:

### Salesperson Model
This model creates data for a salesperson that has their first name, last name, and a unique employee ID of all numbers.

The various endpoints can be accessed through Insomnia and/or your browser:

| Action | Method | URL
| ----------- | ----------- | -----------
| List salespeople | GET | 	http://localhost:8090/api/salespeople/
| Create salesperson | POST | http://localhost:8090/api/salespeople/
| Delete a specific salesperson | DELETE | 	http://localhost:8090/api/salespeople/id/

JSON body to send data:

- Create a salesperson takes a POST request with JSON body in this format:
	- All fields are required for a proper POST request
	- You cannot make an employee with the same ID or error will appear
```
{
	"first_name": "Tom",
	"last_name": "Brady",
	"employee_id": 12
}
```
- Upon a successful request, you should receive JSON data similar to shown below:
```
{
	"first_name": "Tom",
	"last_name": "Brady",
	"employee_id": 12,
	"id": (unique_id)
}
```

- Listing salespeople will require a GET request but does not need JSON input. If the GET request is received, a list of all the created salespeople will appear in the format shown below:
```
{
	"salespeople": [
		{
			"first_name": "Kevin",
			"last_name": "Nguyen",
			"employee_id": 71467916,
			"id": 1
		},
		{
			"first_name": "Kevin",
			"last_name": "d",
			"employee_id": 11,
			"id": 2
		},
		{
			"first_name": "Kevin",
			"last_name": "Nguyen",
			"employee_id": 4,
			"id": 3
		},
		{
			"first_name": "Tom",
			"last_name": "Brady",
			"employee_id": 12,
			"id": 5
		}
	]
}
```

- The DELETE salesperson request requires the unique id(not the employee_id) assigned to the salesperson. If you take the DELETE request url http://localhost:8090/api/salespeople/id/ and replace id with the id of the employee you want deleted and send the request, there will be a JSON response that indicates a boolean value whether or not the DELETE request was successful. The response will be shown like this:
```
{
	"deleted": true
}
```
"deleted": true was returned signaling a successful deletion. "deleted":false will return if nothing was deleted

### Customer Model

### AutomobileVO Model

### Sale Model
