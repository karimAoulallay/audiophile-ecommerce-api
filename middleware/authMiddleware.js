require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken) {
    res.status(401);
    res.json({ message: "No token provided" });
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.json({ message: "Invalid tokens" }).sendStatus(403);
    req.user_id = user.user_id;
    next();
  });
};

module.exports = authMiddleware;
