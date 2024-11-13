const Profile = require("../models/img");

async function handleProfileImageUpload(req, res) {
  try {
    if (!req.files || !req.files.profileImage || !req.files.coverImage) {
      console.log("One or both files are missing.");
      return res
        .status(400)
        .send("Both profile image and cover image are required.");
    }

    console.log("Request body:", req.body);
    console.log("Profile Image:", req.files.profileImage);
    console.log("Cover Image:", req.files.coverImage);

    const profileImgPath = req.files.profileImage[0].path;
    const coverImagePath = req.files.coverImage[0].path;

    const newProfile = new Profile({
      name: req.body.name,
      profileImg: profileImgPath,
      coverImage: coverImagePath,
    });

    await newProfile.save();
    res.send("Profile uploaded successfully");
  } catch (err) {
    console.error("Error saving profile:", err);
    res.status(500).send("Error saving profile image");
  }
}

module.exports = handleProfileImageUpload;
