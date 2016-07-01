// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
} else {
  require('dotenv').config({ path: './env/production.env' });
}

const routeHanlders = require('./routeHandlers');

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const logger = require('morgan');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/api/users/:userId/location', routeHanlders.updateLocation);

app.post('/api/users/', routeHanlders.provideLocations);

app.get('*', function (req, res) {
  res.sendStatus(404);
});

function startApp() {
  app.listen(Number(process.env.PORT), process.env.HOST, () => {
    console.log(
      `${process.env.APP_NAME} is listening at ${process.env.HOST} on port ${process.env.PORT}`
    );
  });
}

startApp();
