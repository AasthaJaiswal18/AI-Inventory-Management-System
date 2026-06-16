import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import AIStockPrediction from "./pages/AIStockPrediction";
import AIChat from "./pages/AIChat";

function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">

        <Routes>

          {/* Dashboard */}
          <Route
            path="/"
            element={<Dashboard />}
          />

          {/* Products */}
          <Route
            path="/products"
            element={<Products />}
          />

          {/* Add Product */}
          <Route
            path="/add-product"
            element={<AddProduct />}
          />

          {/* AI Stock Prediction */}
          <Route
            path="/ai-stock"
            element={<AIStockPrediction />}
          />

          {/* Gemini AI Chat */}z
          <Route
            path="/ai-chat"
            element={<AIChat />}
          />

        </Routes>

      </div>

    </div>
  );
}

export default App;