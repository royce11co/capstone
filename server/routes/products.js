const cors = require("cors");
const express = require("express");
const router = express.Router();
const data = require("../data/products.json");

const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const productsFile = path.join(__dirname, "../data/products.json");
router.use(express.static(path.join(__dirname, "public")));

function listProducts() {
  const data = fs.readFileSync(productsFile);
  return JSON.parse(data);
}

function addProducts(body) {
  const productsArr = listProducts();
  const products = new Products(body.name, body.description, body.image, body.quantity);
  productsArr.products.push(products);

  fs.writeFileSync(productsFile, JSON.stringify(productsArr));

  return products;
}

function Products(name, description, image, quantity) {
  this.id = uuidv4();
  this.name = name;
  this.description = description;
  this.image = image;
  this.quantity = quantity;
}

router.use(cors());

router.post("/", (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({
      error: "POST body must contain all required properties",
      requiredProperties: ["name", "description"],
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
