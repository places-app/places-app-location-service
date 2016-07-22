# location-service

What it does 
This location service is a lean nodejs server with 2 main API routes:

## Getting Started 
Clone and install dependencies:

`$npm install`

If staring the server locally:

Create env/development.env and set environment variables. Follow example in .env.sample.

Start the redis server

`$ redis-server`

Fire up the server

`$ npm start`

Or if using docker:

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


Mobile users to post their location to the database 
`POST api/users/:userId/location`

API servers to request the location for an array of users
`POST api/getLocations`

The location update is expecting a body of the following format:
```
{
  location: {
    coords: {
      latitude:<someLat>,
      longitude:<someLng>,
    },
    activity: {
      type:<options are: on_foot, on_bicycle, in_vehicle>
      confidence:<1-100>
    }
  }
}
```

The getLocations route expects a JSON body having an array of user ids stored under the basicFollows key. For example, if wanting location info for users with ids: 6, 12, and 17:
`{basicFollows: [6, 12, 17]}`

##Team

Location Service Developer: Adam Lessen

Product Owner: Adam Lessen

Scrum Master: Sepehr Vakili

Development Team Members: Jordan Tepper, Sepehr Vakili, Andrew Phavichitr, Adam Lessen

##Contributing

See CONTRIBUTING.md for contribution guidelines.
