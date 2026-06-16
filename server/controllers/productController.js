const Product = require("../models/product");


// Create Product
const createProduct = async (req, res) => {
  try {
    const { name, category, price, quantity, description } = req.body;

    const product = await Product.create({
      name,
      category,
      price,
      quantity,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Products + Pagination
const getAllProducts = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = 5;

    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments();

    const products = await Product.find()
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update Product
const updateProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Product
const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Search Products
const searchProducts = async (req, res) => {
  try {

    const keyword = req.query.keyword;

    const products = await Product.find({
      name: {
        $regex: keyword,
        $options: "i",
      },
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Filter By Category
const getProductsByCategory = async (req, res) => {
  try {

    const products = await Product.find({
      category: req.params.category,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Low Stock Products
const getLowStockProducts = async (req, res) => {
  try {

    const products = await Product.find({
      quantity: { $lte: 5 },
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// AI Stock Prediction
const predictStock = async (req, res) => {
  try {

    const products = await Product.find();

    const predictions = products.map((product) => {

      let message = "";
      let recommendation = "";

      if (product.quantity <= 5) {
        message = "⚠️ Stock will run out soon";
        recommendation = "Reorder 20 units";
      }

      else if (product.quantity <= 10) {
        message = "⚡ Stock is moderate";
        recommendation = "Monitor stock regularly";
      }

      else {
        message = "✅ Stock level is healthy";
        recommendation = "No action required";
      }

      return {
        name: product.name,
        category: product.category,
        currentStock: product.quantity,
        prediction: message,
        recommendation,
      };

    });

    res.status(200).json({
      success: true,
      predictions,
    });

  }

  catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {

    const totalProducts = await Product.countDocuments();

    const lowStockProducts = await Product.countDocuments({
      quantity: { $lte: 5 },
    });

    const categories = await Product.distinct("category");

    const products = await Product.find();

    const totalInventoryValue = products.reduce(
      (total, product) =>
        total + product.price * product.quantity,
      0
    );

    res.status(200).json({
      success: true,
      totalProducts,
      totalCategories: categories.length,
      lowStockProducts,
      totalInventoryValue,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Export All Functions
module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory,
  getLowStockProducts,
  getDashboardStats,
  predictStock
};