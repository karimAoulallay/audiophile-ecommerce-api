const express = require("express");
const router = express.Router();
const {
  getUserCart,
  deleteProduct,
  addProduct,
  updateProduct,
  clearCart,
} = require("../controllers/cartControllers");
const authMiddleware = require("../middleware/authMiddleware");

// @Desc Get user cart
// @Route GET api/carts
// @Access Private
router.get("/", authMiddleware, getUserCart);

// @Desc Add product to cart
// @Route POST api/carts
// @Access Private
router.post("/", authMiddleware, addProduct);

// @Desc Delete all products
// @Route DELETE api/carts/clear
// @Access Private
router.delete("/clear", authMiddleware, clearCart);

// @Desc Update product from cart
// @Route PUT api/carts/:product_id
// @Access Private
router.put("/:product_id", authMiddleware, updateProduct);

// @Desc Delete product from cart
// @Route DELETE api/carts
// @Access Private
router.delete("/:product_id", authMiddleware, deleteProduct);

module.exports = router;
