const express = require("express");
const { getProducts } = require("../controllers/productControllers");
const router = express.Router();

// @Desk get all products
// @Route GET api/products
// @Access Public
router.get("/", getProducts);

module.exports = router;
