const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const cartItemSchema = new Schema(
  {
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    unit_price: { type: Number, required: true },
  },
  {
    _id: false,
    versionKey: false,
  }
);

const cartSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  products: [cartItemSchema],
});

module.exports = model("Cart", cartSchema);
