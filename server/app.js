// test comment
const boom = require('boom');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Sentry = require('@sentry/node');
const Sqreen = require('./sqreen');

const router = require('./router');
const cronJobs = require('./helpers/cronjobs');

const app = express();
require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
  // The request handler must be the first middleware on the app
  app.use(Sentry.Handlers.requestHandler());
}

const port = process.env.PORT || 8080;
app.set('port', port);

app.use(Sqreen.middleware);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
cronJobs(Sentry);

app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
  // serve any static files
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  // Handle React routing, resturn all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(boom.notFound('Not Found'));
});

if (process.env.NODE_ENV === 'production') {
  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());
}

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // print out the eror to the console in test mood
  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  } else {
    console.log(err.message);
  }

  // send the error object
  if (err.isBoom) {
    // for boom errors
    res.status(err.output.statusCode || 500);
  } else {
    // for unexpected internal server errors
    res.status(err.statusCode || 500);
  }
  let error = err.message;
  const { details } = err;
  if (err.isJoi) {
    error = 'Invalid request data. Please review request and try again.';
  }
  res.json({ error, details });
});

module.exports = app;
