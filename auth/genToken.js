const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (user_id) => {
  const accessToken = jwt.sign({ user_id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 1000 * 60 * 15,
  });

  return accessToken;
};

const generateRefreshToken = (user_id) => {
  const refreshToken = jwt.sign({ user_id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: 1000 * 60 * 15,
  });

  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
