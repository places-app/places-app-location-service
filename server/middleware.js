const logger = require('morgan');
const bodyParser = require('body-parser');

// configure IP filtering to ensure only explicit servers have access
const ipfilter = require('express-ipfilter');


const ips = [process.env.API_SERVER_IP];

module.exports = function middleware(app) {
  app.use(logger('dev'));

  // app.use('/api/getLocations', ipfilter(ips, { mode: 'allow' }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};
