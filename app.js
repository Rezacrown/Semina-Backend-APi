const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


// routers
const categories = require('./app/api/v1/categories/router')
const image = require('./app/api/v1/image/router')
const talents = require('./app/api/v1/talent/router')
const events = require('./app/api/v1/events/router')


// midlewarr & error
const notFoundMiddleware = require("./app/middleware/not-found");
const handleErrorMiddleware = require("./app/middleware/handler-error");

const v1 = '/api/v1/cms'


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(v1, categories)
app.use(v1, image)
app.use(v1, talents)
app.use(v1, events)


app.use(notFoundMiddleware)
app.use(handleErrorMiddleware)


module.exports = app;
