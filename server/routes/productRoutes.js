const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory,
  getLowStockProducts,
  getDashboardStats,
  predictStock
} = require("../controllers/productController");


// Create Product
router.post("/", createProduct);


// Get All Products + Pagination
router.get("/", getAllProducts);


// Search Product
router.get("/search", searchProducts);


// Filter By Category
router.get("/category/:category", getProductsByCategory);


// Low Stock Products
router.get("/low-stock", getLowStockProducts);


// Dashboard Stats
router.get("/stats", getDashboardStats);


// Update Product
router.put("/:id", updateProduct);


// Delete Product
router.delete("/:id", deleteProduct);

router.get("/ai-stock-prediction", predictStock);


module.exports = router;