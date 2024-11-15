const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send("Access Denied... Invalid token!!");
  }
  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}
module.exports = auth;
