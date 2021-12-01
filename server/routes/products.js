const cors = require("cors");
const express = require("express");
const router = express.Router();
const data = require("../data/products.json");
const cloudinary = require('cloudinary').v2;

const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const productsFile = path.join(__dirname, "../data/products.json");
router.use(express.static(path.join(__dirname, "public")));
router.use(cors());

function listProducts() {
  const data = fs.readFileSync(productsFile);
  return JSON.parse(data);
}

function addProducts(body) {
  const productsArr = listProducts();
  const products = new Products(body.name, body.description, body.image, body.quantity, body.price);
  productsArr.products.push(products);

  fs.writeFileSync(productsFile, JSON.stringify(productsArr));

  return products;
}

function Products(name, description, image, quantity, price) {
  this.id = uuidv4();
  this.name = name;
  this.description = description;
  this.image = image;
  this.quantity = quantity;
  this.price = price;
}

router.post("/", (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.image || !req.body.quantity || !req.body.price) {
    res.status(400).json({
      error: "POST body must contain all required properties",
      requiredProperties: ["name", "description", "image", "quantity", "price"],
    });
  }
  res.json(addProducts(req.body));
});

router.get("/", (req, res) => {
  res.send(data.products);
});

router.get("/:id", (req, res) => {
  data.products.filter(function (products) {
    if (products.id === req.params.id) {
      res.send(products);
    }
  });
});

module.exports = router;
