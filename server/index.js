require("dotenv").config();

const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();
const productsRoutes = require("./routes/products.js");
const { PORT } = process.env;

app.use(express.json());
app.use(cors());
app.use("/products", productsRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.send(`Welcome to localhost:${PORT}`);
});

app.listen(PORT, function () {
  console.log(`Listening on PORT:${PORT}`);
});
