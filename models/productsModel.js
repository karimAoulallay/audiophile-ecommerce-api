const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  id: Number,
  slug: String,
  name: String,
  shortName: String,
  image: {
    mobile: String,
    tablet: String,
    desktop: String,
  },
  cartImage: String,
  category: String,
  categoryImage: {
    mobile: String,
    tablet: String,
    desktop: String,
  },
  isNewProduct: Boolean,
  price: Number,
  description: String,
  features: String,
  includedItems: [
    {
      quantity: Number,
      item: String,
    },
  ],
  gallery: {
    first: {
      mobile: String,
      tablet: String,
      desktop: String,
    },
    second: {
      mobile: String,
      tablet: String,
      desktop: String,
    },
    third: {
      mobile: String,
      tablet: String,
      desktop: String,
    },
  },
  others: [
    {
      slug: String,
      name: String,
      image: {
        mobile: String,
        tablet: String,
        desktop: String,
      },
    },
  ],
});

module.exports = model("Product", productSchema);
