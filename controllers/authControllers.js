const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const {
  generateRefreshToken,
  generateAccessToken,
} = require("../auth/genToken");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if email taken
  const isEmailTaken = await User.findOne({ email });

  if (isEmailTaken) {
    res.status(409);
    throw Error("Email already taken");
  }

  // hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create new user
  const newUser = await User.create({
    email,
    name,
    password: hashedPassword,
  });

  if (newUser) {
    // create token
    const refreshToken = generateRefreshToken(newUser._id);
    const accessToken = generateAccessToken(newUser._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "none",
    });

    res
      .json({
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        accessToken,
      })
      .status(201);
  } else {
    res.status(400);
    throw new Error("Invalid user credentials");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const user = await User.findOne({ email });

  // check if user exists
  if (user && (await bcrypt.compare(password, user.password))) {
    const refreshToken = generateRefreshToken(user._id);
    const accessToken = generateAccessToken(user._id);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      })
      .json({ id: user._id, email, name: user.name, accessToken });
  } else {
    res.status(400);
    throw new Error("Invalid user credentials");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies) return res.sendStatus(204);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.json({ message: "Logged out successfully" });
});

// get logged in user data
const getUser = asyncHandler(async (req, res) => {
  const user_id = req.user_id;
  const user = await User.findById(user_id);
  res.json({ id: user._id, name: user.name, email: user.email });
});

const token = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  // check if refreshToken exists

  if (!cookies || !cookies.refreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  const { refreshToken } = cookies;

  const decode = jwt.decode(refreshToken);
  const user_id = decode.user_id;

  try {
    const accessToken = generateAccessToken(user_id);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    return res.json(accessToken);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const accessToken = generateAccessToken(user_id);
      const refreshToken = generateRefreshToken(user_id);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      });

      return res.json(accessToken);
    }

    res.status(403).json(err);
  }
});

module.exports = { registerUser, loginUser, getUser, logoutUser, token };
