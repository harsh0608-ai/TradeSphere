const User = require("../model/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      try {
        const user = await User.findById(data.id);
        if (user) return res.json({ status: true, user: user.username, userId: user._id });
        else return res.json({ status: false });
      } catch (error) {
        console.error("User verification error:", error);
        return res.json({ status: false });
      }
    }
  });
};

// Middleware to extract userId from token
module.exports.extractUserId = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided", success: false });
  }
  
  jwt.verify(token, process.env.TOKEN_KEY, (err, data) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(401).json({ message: "Token verification failed", success: false });
    }
    req.userId = data.id;
    next();
  });
};

