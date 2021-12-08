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

let listProducts = () => {
  const productsParse = JSON.parse(
    fs.readFileSync("./data/products.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      }
      return data;
    })
  );
  return productsParse;
};

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


let productUpdate = (data) => {
  fs.writeFile('./data/products.json', JSON.stringify(data), (error) => {
      if (error) {
          console.log(error);
      }
      console.log('Product has been updated');
  })
}

router.put('/edit/:id/update', (req, res) => {
  const productsData = listProducts();
  const foundProduct = productsData.products.find(products => req.params.id === products.id);
  if (!foundProduct) {
      res.status(404).json({
          error: "Product not found"
      });
  }
  foundProduct.name = req.body.name || foundProduct.name;
  foundProduct.description = req.body.description || foundProduct.description;
  foundProduct.quantity = req.body.quantity || foundProduct.quantity;
  foundProduct.image = foundProduct.image;
  foundProduct.price = req.body.price || foundProduct.price;
  productUpdate(productsData);
  res.status(200).json(foundProduct);
})

module.exports = router;
