# location-service

What it does 
This location service is a lean nodejs server with 2 main API routes:





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

Getting started 


Contributing 
