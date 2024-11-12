const winston = require("winston");

module.exports = function () {
  // Handle uncaught exceptions
  winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  // Handle unhandled promise rejections by throwing them
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  // Add transports for regular logs
  winston.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Adds color to the console output
        winston.format.simple() // Simple log format (message only)
      ),
    })
  );

  winston.add(
    new winston.transports.File({
      filename: "logfile.log", // File where logs will be saved
      format: winston.format.combine(
        winston.format.timestamp(), // Adds a timestamp to the log entry
        winston.format.json() // JSON format for structured logs
      ),
    })
  );
};
