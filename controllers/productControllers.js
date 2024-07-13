const Products = require("../models/productsModel");
const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Products.find();
  if (!products) {
  }
  res.json(products);
});

module.exports = { getProducts };
