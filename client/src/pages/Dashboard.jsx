import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaTags,
  FaExclamationTriangle,
  FaRupeeSign,
} from "react-icons/fa";
import API from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    lowStockProducts: 0,
    totalInventoryValue: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
     const response = await API.get("/products/stats");

      console.log("Dashboard Data:", response.data);

      setStats(response.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Electronics Inventory Dashboard
      </h1>
      

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white p-6 rounded-2xl shadow-lg">
          <FaBoxOpen className="text-4xl mb-4" />
          <h2 className="text-lg">Total Products</h2>
          <p className="text-4xl font-bold mt-2">
            {stats.totalProducts}
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-lg">
          <FaTags className="text-4xl mb-4" />
          <h2 className="text-lg">Categories</h2>
          <p className="text-4xl font-bold mt-2">
            {stats.totalCategories}
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-2xl shadow-lg">
          <FaExclamationTriangle className="text-4xl mb-4" />
          <h2 className="text-lg">Low Stock</h2>
          <p className="text-4xl font-bold mt-2">
            {stats.lowStockProducts}
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-2xl shadow-lg">
          <FaRupeeSign className="text-4xl mb-4" />
          <h2 className="text-lg">Inventory Value</h2>
          <p className="text-3xl font-bold mt-2">
            ₹{stats.totalInventoryValue.toLocaleString()}
          </p>
        </div>

      </div>

      <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          Recent Products
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Product</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3">Stock</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-3">iPhone 15</td>
              <td className="p-3">Mobile</td>
              <td className="p-3">₹80,000</td>
              <td className="p-3">10</td>
            </tr>

            <tr className="border-b">
              <td className="p-3">HP Keyboard</td>
              <td className="p-3">Accessories</td>
              <td className="p-3">₹1,200</td>
              <td className="p-3">3</td>
            </tr>

            <tr>
              <td className="p-3">Dell Monitor</td>
              <td className="p-3">Monitor</td>
              <td className="p-3">₹15,000</td>
              <td className="p-3">2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;