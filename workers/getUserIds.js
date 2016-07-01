// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
} else {
  require('dotenv').config({ path: './env/production.env' });
}
var async = require('async');
var db = require('../server/db/db');

var pg = require('pg');
var connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}` || 'postgres://localhost:5432/places';

var client = new pg.Client(connectionString);
client.connect();

const findOrCreate = (id, cb) => {
  db.exists(id, function(err, reply) {
    if (reply !== 1) {
      console.log('does not exist. going to create id: ', id);
      db.hmset(id, { prevLat: '', prevLng: '' }, (err2, result) => {
        if (err2) {
          console.log(err2);
        }
        cb(null, result);
      });
    } else {
      cb(null, reply);
    }
  });
};

const getData = (id, cb) => {
  db.hgetall(id, (err, object) => {
    const userLoc = {};
    userLoc[id] = object;
    cb(null, userLoc);
  });
};

var query = client.query("SELECT id FROM users", function(err, result) {
  const ids = [];
  console.log(result.rows[0].id);
  for (const row in result.rows) {
    console.log(row);
    ids.push(row);
  }
  console.log('ids are: ', ids);
  // need an async for loop
  // loop over each thing in ids
    // do its thing
  async.each(ids, findOrCreate, (err2, results) => {
    if (err2) {
      console.log(err2);
    }
    console.log(results);
  });
  async.map(ids, getData, (err3, allResults) => {
    if (err3) {
      console.log(err3);
    }
    console.log('payload is: ', allResults);
  });
});

query.on('end', function() { client.end(); });
