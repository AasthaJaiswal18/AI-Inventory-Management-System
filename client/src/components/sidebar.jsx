import { FaHome, FaBox, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-74 bg-indigo-700 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        📦 Inventory System
      </h1>

      <ul className="space-y-4">

        <Link to="/">
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
            <FaHome />
            Dashboard
          </li>
        </Link>

        <Link to="/products">
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
            <FaBox />
            Products
          </li>
        </Link>

        <Link to="/add-product">
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
            <FaPlusCircle />
            Add Product
          </li>
        </Link>
        <Link
  to="/ai-stock"
  className="flex items-center gap-3 text-white text-xl mt-5"
>
  🧠 AI Stock Prediction
 </Link>


 <Link
  to="/ai-chat"
  className="flex items-center gap-3 text-white text-xl mt-5"
>
  🤖 AI Assistant
 </Link>

      </ul>
    </div>
  );
}

export default Sidebar;