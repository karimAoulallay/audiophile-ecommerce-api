const mongoose = require("mongoose");
const fs = require("fs");
const connectDB = require("../config/db");
const Product = require("../models/productsModel");

// connect to database
connectDB();

const seedProducts = async () => {
  try {
    // Clear the existing products collection
    await Product.deleteMany({});

    // Read the products data from the JSON file
    const products = JSON.parse(fs.readFileSync("products.json", "utf-8"));

    // Insert the products data into the collection
    await Product.insertMany(products);

    console.log("Products seeded successfully");
    process.exit(); // Exit the process after seeding
  } catch (err) {
    console.error("Error seeding products:", err);
    process.exit(1); // Exit with error code 1 in case of failure
  }
};

seedProducts();
