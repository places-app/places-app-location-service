var redis = require('redis');


console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT);


var client = redis.createClient('6379', 'redis');



client.on('connect', function() {
    console.log('redis server connected');
});
client.on('error', function(err) {
    console.log('Redis error: ', err);
});


module.exports = client;

