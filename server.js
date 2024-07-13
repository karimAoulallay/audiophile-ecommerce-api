const express = require("express");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");

// connect to database
connectDB();

app.use(cookieParser());

// enable reading data in header body
app.use(express.urlencoded({ extended: true }));

// enable reading data as json in client side
app.use(express.json());

// enable cors for client side origin
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/carts", require("./routes/cartRoutes"));
app.use("/api/users", require("./routes/authRoutes"));

// Error handler - returns descriptive json object error messages
app.use(errorHandler);

app.listen(PORT, () => console.log("Server started on ", PORT));
