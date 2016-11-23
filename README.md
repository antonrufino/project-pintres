# project-pintres
CMSC 100 is &lt;3

## Installing bower
Bower can be used (negotiable) for maintaining frontend dependencies. We won't always have an Internet connection so might as well have local copies of necessary libraries e.g. AngularJS, jQuery, etc.

```bash
sudo npm install bower -g
```

## Installing project dependencies
```bash
# This assumes you are in the root of the project folder.
npm install # Install stuff needed by backend
cd frontend
bower install # Install stuff needed by frontend
```

## Setting up the database
The SQL file to setup the database can be found in backend/pintres.sql. To setup the database
needed in the project run

```bash
#Assuming you're still in the root folder of the project
mysql -u root -p < backend/pintres.sql
```

## Running the project
The main file for the project's backend is backend/server.js. To run the server use

```bash
node backend/server.js
```

If nothing goes wrong, open your browser and got to localhost:8000 and you will see the login page. At the moment it is not connected to the backend yet so you can just go to localhost:8000/api/login and it will log you into antonrufino's account. 
