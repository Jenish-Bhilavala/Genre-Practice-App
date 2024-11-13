const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: String,
  profileImg: { type: String },
  coverImage: { type: String },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
