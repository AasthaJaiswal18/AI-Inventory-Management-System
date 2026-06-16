import { useState } from "react";
import API from "../services/api";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/products", product);

      alert("Product Added Successfully!");

      console.log(response.data);

      setProduct({
        name: "",
        category: "",
        price: "",
        quantity: "",
        description: "",
      });

    } catch (error) {
      console.log("Add Product Error:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-100 min-h-screen">
      
      <h1 className="text-4xl font-bold mb-8">
        Add New Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg max-w-xl"
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Stock Quantity"
          value={product.quantity}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg"
          rows="4"
          required
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Add Product
        </button>

      </form>

    </div>
  );
}

export default AddProduct;