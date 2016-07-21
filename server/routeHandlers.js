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
    console.log('---------current time stamp is----------: ', new Date());
    console.log('coords are: ', req.body.location.coords);
    console.log('activity is: ', req.body.location.activity);
    const { coords, activity } = req.body.location;
    const userId = req.params.userId;
    console.log('userId is: ', userId);
    db.hgetall(userId, (err, object) => {
      if (object) {
        if (+object.currLat !== +coords.latitude || +object.currLng !== +coords.longitude) {
          db.hmset(userId, {
            currLat: coords.latitude,
            currLng: coords.longitude,
            prevLat: object.currLat,
            prevLng: object.currLng,
            locUpdatedAt: new Date(),
          });
          if (activity.confidence > 50) {
            db.hmset(userId, {
              activity: activity.type,
              activityUpdateAt: new Date(),
            });
          }
        }
      } else {
        db.hmset(userId, {
          currLat: coords.latitude,
          currLng: coords.longitude,
          prevLat: '',
          prevLng: '',
          locUpdatedAt: new Date(),
          activity: '',
          activityUpdateAt: new Date(),
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
