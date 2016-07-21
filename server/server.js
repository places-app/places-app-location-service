// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
} else {
  require('dotenv').config({ path: './env/production.env' });
}

const middleware = require('./middleware');
const routeHandlers = require('./routeHandlers');

const express = require('express');
const app = express();

middleware(app);

app.get('/', (req, res) => res.send('Hello World!')
  );

app.post('/api/users/:userId/location', routeHandlers.updateLocation);

app.post('/api/getLocations', routeHandlers.provideLocations);

app.get('*', (req, res) => res.sendStatus(404)
  );

const startApp = () =>
  app.listen(Number(process.env.PORT), process.env.HOST, () => {
    console.log(
      `${process.env.APP_NAME} is listening at ${process.env.HOST} on port ${process.env.PORT}`
    );
  });

startApp();
