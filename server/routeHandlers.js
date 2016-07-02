const db = require('./db/db');
const async = require('async');

const getData = (id, cb) => {
  db.hgetall(id, (err, object) => {
    const userLoc = {};
    userLoc[id] = object;
    cb(null, userLoc);
  });
};

module.exports = {
  updateLocation: (req, res) => {
    // console.log('req.body coords is: ', req.body.location.coords);
    // console.log('req.body time stamp is: ', req.body.location.timestamp);
    // console.log('req.body activty is: ', req.body.location.activity);
    const { coords, activty, timestamp, is_moving } = req.body.location;
    // some userId
    const userId = req.params.userId;
    console.log('userId is: ', userId);
    console.log('lat and lng are: ', coords.latitude, coords.longitude);
    db.hgetall(userId, (err, object) => {
      // console.log('object was: ', object);
      if (object) {
        if (+object.currLat !== +coords.latitude || +object.currLng !== +coords.longitude) {
          console.log('ACTUALLY UPDATING-----------');
          db.hmset(userId, {
            currLat: coords.latitude,
            currLng: coords.longitude,
            prevLat: object.currLat,
            prevLng: object.currLng,
            updatedAt: new Date(),
            //etc
          });
        }
      } else {
        db.hmset(userId, {
          currLat: coords.latitude,
          currLng: coords.longitude,
          prevLat: '',
          prevLng: '',
          updatedAt: new Date(),
          //etc
        });
      }
    });
    res.sendStatus(200);
  },
  provideLocations: (req, res) => {
    // req.body will provide ids
    // res.sendStatus(200);
    const ids = req.body.basicFollows;
    async.map(ids, getData, (err, allResults) => {
      if (err) {
        console.log(err);
      }
      const cleanResults = {};
      allResults.forEach(obj => {
        const key = Object.keys(obj);
        cleanResults[key] = obj[key];
      });
      res.send(cleanResults);
    });
  },
};
