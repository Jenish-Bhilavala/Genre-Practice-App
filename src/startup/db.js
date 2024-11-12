const winston = require("winston");
const mongoose = require("mongoose");
require("dotenv").config();

module.exports = function () {
  mongoose
    .connect(process.env.DB)
    .then(() => winston.info(`Connected to ${process.env.DB}...`))
    .catch((err) => console.error("Connection Failed...", err));
};
