const express = require("express");
const app = express();
const winston = require("winston");
const path = require("path");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

require("./src/startup/logging")();
require("./src/startup/routes")(app);
require("./src/startup/db")();
require("./src/startup/config")();
require("./src/startup/validation")();
require("./src/startup/prod")(app);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  winston.info(`listening on port ${PORT}`)
);

module.exports = server;
