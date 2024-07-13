const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");

const getUserCart = asyncHandler(async (req, res) => {
  const user_id = req.user_id;
  const userCart = await Cart.findOne({ user_id });

  res.json(userCart);
});

const addProduct = asyncHandler(async (req, res) => {
  const { product_id, quantity, unit_price } = req.body;
  const user_id = req.user_id;

  const userCart = await Cart.findOne({ user_id });

  // if user does not have a cart yet
  if (!userCart) {
    const newUserCart = await Cart.create({
      user_id,
      products: [{ product_id, quantity, unit_price }],
    });

    const savedUserCart = await newUserCart.save();

    return res.status(201).json(savedUserCart);
  }

  const cartProduct = await Cart.findOne({ "products.product_id": product_id });

  // if that product is not added to cart yet
  if (!cartProduct) {
    userCart.products.push({ product_id, quantity, unit_price });

    const savedUserCart = await userCart.save();

    return res.status(201).json(savedUserCart);
  }

  // update product quantity in user cart
  const updatedCartProduct = await Cart.findOneAndUpdate(
    {
      user_id,
      "products.product_id": product_id,
    },
    {
      $inc: {
        "products.$.quantity": quantity,
      },
    },
    {
      new: true,
    }
  );

  res.json(updatedCartProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const user_id = req.user_id;
  const product_id = req.params.product_id;
  const { quantity } = req.body;

  const updatedCart = await Cart.findOneAndUpdate(
    { user_id, "products.product_id": product_id },
    {
      $set: {
        "products.$.quantity": quantity,
      },
    },
    {
      new: true,
    }
  );

  const updatedProduct = updatedCart.products.find(
    (p) => p.product_id == product_id
  );

  res.json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const user_id = req.user_id;
  const product_id = req.params.product_id;

  await Cart.findOneAndUpdate(
    {
      user_id,
    },
    {
      $pull: {
        products: {
          product_id,
        },
      },
    }
  );

  res.json(product_id);
});

const clearCart = asyncHandler(async (req, res) => {
  const user_id = req.user_id;

  const updatedCart = await Cart.findOneAndUpdate(
    { user_id },
    {
      products: [],
    },
    { new: true }
  );

  res.json(updatedCart);
});

module.exports = {
  addProduct,
  updateProduct,
  getUserCart,
  deleteProduct,
  clearCart,
};
