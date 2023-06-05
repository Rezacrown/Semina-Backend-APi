const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// routers
const categories = require("./app/api/v1/categories/router");
const image = require("./app/api/v1/image/router");
const talents = require("./app/api/v1/talent/router");
const events = require("./app/api/v1/events/router");
const organizers = require("./app/api/v1/organizers/router");
const authCMS = require("./app/api/v1/auth/router");
const orders = require("./app/api/v1/orders/router");
const participants = require("./app/api/v1/participants/router");
const payments = require("./app/api/v1/payments/router");
const refreshToken = require("./app/api/v1/userRefreshToken/router");


// midlewarr & error
const notFoundMiddleware = require("./app/middleware/not-found");
const handleErrorMiddleware = require("./app/middleware/handler-error");

const v1CMS = "/api/v1/cms";

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(v1CMS, categories);
app.use(v1CMS, image);
app.use(v1CMS, talents);
app.use(v1CMS, events);
app.use(v1CMS, organizers);
app.use(v1CMS, orders);
app.use(v1CMS, payments);
app.use(v1CMS, authCMS);
// app.use(v1CMS, authCMS);
app.use(v1CMS, refreshToken);
app.use(`/api/v1`, participants);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
