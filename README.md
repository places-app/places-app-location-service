# location-service

This service is a lean server to store and retrieve users' current and previous location 

## Getting Started 
Clone the repo down. 

Install dependencies:

`$ npm install`

#### If staring the server locally:

Create env/development.env and set environment variables. Follow example in .env.sample.

Start the redis server

`$ redis-server`

Fire up the server

`$ npm start`

#### Or if using docker:

Create env/production.env and set environment variables. Follow example in .env.sample. SET HOST TO web for docker compose to work.

Open up the Docker quick start terminal, and ensure connected to the corret Docker machine with:

`$ docker-machine ls`

Then, to start, simply:

`$ docker-compose up -d`

Start hitting the API routes to store / retrieve users' location info

## Tech
node / express server with a redis database for storing and retrieving a user's last two locations

## Directory Layout

Use the diagram below as an example and starting point 

```
.
├── /env/                     # Environment variables
├── /node_modules/            # 3rd-party libraries and utilities
├── /server/                  # Server source code
    ├── /db/                  # Database source code
        ├── db.js             # Database config & connection
    ├── middelware.js         # Middleware
    ├── routeHandlers.js      # Route handlers
    ├── server.js             # Server config and connection
├── /workers/                 # Crawls external database
├── package.json              # List of 3rd party libraries and utilities to be installed
├── Dockerfile                # Instructions to build docker image
└── docker-compose.yml        # Connects and builds docker images
```


##Team

Location Service Developer: Adam Lessen

Product Owner: Adam Lessen

Scrum Master: Sepehr Vakili

Development Team Members: Jordan Tepper, Sepehr Vakili, Andrew Phavichitr, Adam Lessen

##Contributing

See CONTRIBUTING.md for contribution guidelines.
