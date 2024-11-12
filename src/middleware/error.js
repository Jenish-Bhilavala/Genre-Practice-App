const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);
  // winston.error(err.message, { stack: err.stack });
  // error
  // warn
  // info
  // verbose
  // debug
  // silly
  res.status(500).send("Internal Server Error");
};
