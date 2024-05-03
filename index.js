"use strict";

var assert = require("assert");
require("dotenv").config();

// Add node-env-file
const env = require("node-env-file");

//logger
const logger = require("morgan");

// Add express
const express = require("express");

// Add Cookie parser
const cookieParser = require("cookie-parser");

// Add bodyParser
const bodyParser = require("body-parser");

// Instance express object
const app = express();

const cors = require("cors");

process.env.TZ = "America/Mexico_City";

//logger
app.use(logger("dev"));

app.use(cors());

// Deffine .env file
env(__dirname + "/.env");

/*// Settings urlencoded and add to express
app.use(bodyParser.urlencoded({ extended: true }));

// Add bodyParser.json() to express
app.use(bodyParser.json());*/

app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}));

// Add cookieParser to express
app.use(cookieParser());

// Add  static directory públic to middleware of express
app.use(express.static(__dirname + "/uploads"));

// Mount Server
app.listen(process.env.SERVERPORT || 3000, () => {
  console.log(
    `Puerto escuchando en http://localhost:${process.env.SERVERPORT || 3000}`
  );
});

const routes = require("./routes/index");
app.use(routes);

app.get("/syncseq", function (req, res, next) {
  db.sequelize
    .sync({ alter: true })
    .then((result) => {
      res.send("Correct Sync");
    })
    .catch((err) => {
      res.send("Problem: " + err);
    });
});

const internal_server = response => {
  return (message = "", data = {}) => {
    if (message === "") {
      message = "Internal Server error";
    }
    return res(response, false, 500, true, 500, message, data);
  };
};

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  internal_server(res)(err.message);
}

app.use(errorHandler);

const not_found = response => {
  return (message = "", data = {}) => {
    if (message === "") {
      message = "Resource not found";
    }
    return res(response, false, 404, true, 404, message, data);
  };
};

app.use(function (req, res, next) {
  not_found(res)("Not found 404!!!");
});

// Test Database connection
const db = require("./models");
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Base de datos conectada!!!");
  })
  .catch((err) => {
    console.error("Conexión a la base de datos falló!", err);
  });

  // https://blog.logrocket.com/using-sequelize-with-typescript/