import { useEffect, useState } from "react";
import API from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  // Fetch Products with Pagination
  const fetchProducts = async () => {
    try {
      const response = await API.get(
        `/products?page=${page}`
      );

      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);

    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, [page]);


  // Search Product
  const searchProduct = async (value) => {
    setKeyword(value);

    if (value.trim() === "") {
      fetchProducts();
      return;
    }

    try {
      const response = await API.get(
        `/products/search?keyword=${value}`
      );

      setProducts(response.data.products);

    } catch (error) {
      console.log("Search Error:", error);
    }
  };


  // Filter Category
  const filterCategory = async (value) => {
    setCategory(value);

    if (value === "All") {
      fetchProducts();
      return;
    }

    try {
      const response = await API.get(
        `/products/category/${value}`
      );

      setProducts(response.data.products);

    } catch (error) {
      console.log("Category Error:", error);
    }
  };


  // Delete Product
  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/products/${id}`);

      alert("Product Deleted Successfully ✅");

      fetchProducts();

    } catch (error) {

      console.log("Delete Error:", error);

      alert("Failed to delete product ❌");

    }
  };


  // Open Edit Modal
  const handleEdit = (product) => {
    setEditProduct({ ...product });
    setShowModal(true);
  };


  // Handle Input Change
  const handleChange = (e) => {

    setEditProduct({
      ...editProduct,
      [e.target.name]: e.target.value,
    });

  };


  // Update Product
  const updateProduct = async () => {

    try {

      await API.put(
        `/products/${editProduct._id}`,
        editProduct
      );

       alert("Product Updated Successfully ✅");

       setShowModal(false);

       setEditProduct(null);

       fetchProducts();

    } catch (error) {

      console.log("Update Error:", error);

      alert("Failed to Update Product ❌");

    }
  };
    return (
    <div className="flex-1 p-8 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        All Products
      </h1>


      {/* Search + Category Filter */}
      <div className="mb-5 flex gap-4">

        <input
          type="text"
          placeholder="🔍 Search product by name..."
          value={keyword}
          onChange={(e) => searchProduct(e.target.value)}
          className="w-full md:w-96 p-3 border rounded-lg shadow-sm outline-none"
        />


        <select
          value={category}
          onChange={(e) => filterCategory(e.target.value)}
          className="p-3 border rounded-lg shadow-sm outline-none"
        >
          <option value="All">All Categories</option>
          <option value="Mobile">Mobile</option>
          <option value="Laptop">Laptop</option>
          <option value="Accessories">Accessories</option>
        </select>

      </div>


      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>


          <tbody>

            {products.length > 0 ? (

              products.map((item) => (

                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4 font-semibold">
                    {item.name}
                  </td>


                  <td className="p-4">
                    {item.category}
                  </td>


                  <td className="p-4 text-green-600 font-bold">
                    ₹{item.price.toLocaleString()}
                  </td>


                  <td className="p-4">

                    <span
                      className={
                        item.quantity <= 5
                          ? "text-red-600 font-bold"
                          : "text-green-600 font-bold"
                      }
                    >
                      {item.quantity}
                    </span>


                    {item.quantity <= 5 && (
                      <p className="text-red-500 text-sm">
                        Low Stock ⚠️
                      </p>
                    )}

                  </td>


                  <td className="p-4">
                    {item.description}
                  </td>


                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </button>


                    <button
                      onClick={() => deleteProduct(item._id)}
                      className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500"
                >
                  No Products Found
                </td>
              </tr>

            )}

          </tbody>

        </table>


        {/* Pagination */}

        <div className="flex justify-center items-center gap-4 p-5">

          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="bg-gray-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Previous
          </button>


          <p className="font-semibold">
            Page {page} of {totalPages}
          </p>


          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="bg-indigo-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Next
          </button>

        </div>

      </div>



      {/* Edit Modal */}

      {showModal && editProduct && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-[500px]">

            <h2 className="text-2xl font-bold mb-4">
              Edit Product
            </h2>


            <input
              type="text"
              name="name"
              value={editProduct.name}
              onChange={handleChange}
              className="w-full border p-3 mb-3 rounded"
            />


            <input
              type="text"
              name="category"
              value={editProduct.category}
              onChange={handleChange}
              className="w-full border p-3 mb-3 rounded"
            />


            <input
              type="number"
              name="price"
              value={editProduct.price}
              onChange={handleChange}
              className="w-full border p-3 mb-3 rounded"
            />


            <input
              type="number"
              name="quantity"
              value={editProduct.quantity}
              onChange={handleChange}
              className="w-full border p-3 mb-3 rounded"
            />


            <textarea
              name="description"
              rows="4"
              value={editProduct.description}
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded"
            />


            <div className="flex gap-3">

              <button
                onClick={updateProduct}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
                Update
              </button>


              <button
                onClick={() => {
                  setShowModal(false);
                  setEditProduct(null);
                }}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Products;