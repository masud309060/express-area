const express = require('express');
const logger = require('morgan');
require('dotenv').config();
const cors = require('cors')
const db = require('./db/db')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const areasRouter = require('./routes/areas')

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/areas', areasRouter);

module.exports = app;
