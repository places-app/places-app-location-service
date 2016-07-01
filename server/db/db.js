var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
    console.log('redis server connected');
});

// client.hmset('4', {
//   currLat: 50,
//   currLng: 100,
//   prevLat: 2,
//   prevLng: 10,
//   udpatedAt: new Date(),
// }, (err, result) => {
//   console.log('1st result is', result);
// });

client.hgetall('4', (err, result) => {
  console.log('2nd result is', result);
});

module.exports = client;

