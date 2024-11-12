const express = require("express");
const genre = require("../routes/genres");
const customer = require("../routes/customers");
const movie = require("../routes/movies");
const user = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  require("dotenv").config();
  app.use("/api/genres", genre);
  app.use("/api/customers", customer);
  app.use("/api/movies", movie);
  app.use("/api/users", user);
  app.use("/api/auth", auth);
  app.use(error);
};
