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
    db.hgetall(userId, (err, object) => {
      console.log('object was: ', object);
      if (object) {
        db.hmset(userId, {
          currLat: coords.latitude,
          currLng: coords.longitude,
          prevLat: object.currLat,
          prevLng: object.currLng,
          udpatedAt: new Date(),
          //etc
        });
      } else {
        db.hmset(userId, {
          currLat: coords.latitude,
          currLng: coords.longitude,
          prevLat: '',
          prevLng: '',
          udpatedAt: new Date(),
          //etc
        });
      }
    });
    res.sendStatus(200);
  },
  provideLocations: (req, res) => {
    // req.body will provide ids
    console.log('req.body is-----------', req.body);
    // res.sendStatus(200);
    const ids = req.body.basicFollows || [1, 4];
    async.map(ids, getData, (err, allResults) => {
      if (err) {
        console.log(err);
      }
      console.log('payload is: ', allResults);
      const cleanResults = {};
      allResults.forEach(obj => {
        const key = Object.keys(obj);
        cleanResults[key] = obj[key];
      });
      res.send(cleanResults);
    });
  },
};
