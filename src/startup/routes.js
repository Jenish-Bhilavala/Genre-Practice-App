const express = require("express");
const genre = require("../routes/genres");
const customer = require("../routes/customers");
const movie = require("../routes/movies");
const user = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const path = require("path");
const upload = require("../config/multer");
const handleProfileImageUpload = require("../middleware/handleProfileImageUpload");

module.exports = function (app) {
  require("dotenv").config();

  app.post(
    "/profile",
    upload.fields([{ name: "profileImage" }, { name: "coverImage" }]),
    handleProfileImageUpload
  );

  app.use("/api/genres", genre);
  app.use("/api/customers", customer);
  app.use("/api/movies", movie);
  app.use("/api/users", user);
  app.use("/api/auth", auth);
  app.use(error);
};
