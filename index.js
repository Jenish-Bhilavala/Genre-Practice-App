const express = require("express");
const app = express();
const winston = require("winston");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/data/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "form.html"));
});

app.post("/profile", upload.single("profileImage"), function (req, res, next) {
  // Check if a file was uploaded
  if (!req.file) {
    console.log("File not found");
    return res.status(400).send("No file uploaded.");
  }
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
});

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
