const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
  token,
} = require("../controllers/authControllers");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// @Desc Register user
// @Route POST api/users
// @Access Public
router.post("/", registerUser);

// @Desc Login user
// @Route POST api/users/login
// @Access Public
router.post("/login", loginUser);

// @Desc Log out user
// @Route DELETE api/users
// @Access Private
router.post("/logout", authMiddleware, logoutUser);

// @Desc Get user data
// @Route GET api/users
// @Access Private
router.get("/", authMiddleware, getUser);

// @Desc generate accessToken by checking refreshToken validation
// @Route GET api/auth/token
// @Access Public
router.post("/token", token);

module.exports = router;
