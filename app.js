const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');
const serverErrorHandler = require('./middlewares/serverErrorHandler');
const { limiter } = require('./utils/RateLimiter');

const { PORT = 3000 } = process.env;

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');
const router = require('./routes/index');

const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(requestLogger);
// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(express.json());

app.use(
  express.urlencoded({ extended: true }),
);

app.use(cors);

mongoose.connect(DB_ADDRESS);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(serverErrorHandler);

app.listen(PORT);
