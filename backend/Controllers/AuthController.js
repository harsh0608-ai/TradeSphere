const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }
    const user = await User.create({ email, password, username });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ message: "User signed up successfully", success: true, user: user.username });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect password or email", success: false });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({ message: "Incorrect password or email", success: false });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "User logged in successfully", success: true, user: user.username });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};
