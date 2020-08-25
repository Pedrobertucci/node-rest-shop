const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const ProductController = require("../controllers/products");

router.get("/", checkAuth, ProductController.get_all_products);

router.get("/:productId", checkAuth, ProductController.get_product);

router.post("/", checkAuth, ProductController.create_product);

router.patch("/:productId", ProductController.update_product);

router.delete("/:productId", ProductController.delete_product);

module.exports = router;