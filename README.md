# location-service

What it does 
This location service is a lean nodejs server with 2 main API routes:

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
