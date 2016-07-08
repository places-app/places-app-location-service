const logger = require('morgan');
const bodyParser = require('body-parser');

// configure IP filtering to secure access
const ipfilter = require('express-ipfilter');
const ips = ['104.236.72.252'];


module.exports = function middleware(app) {
  app.use(logger('dev'));

  app.use('/api/getLocations', ipfilter(ips, { mode: 'allow' }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};
