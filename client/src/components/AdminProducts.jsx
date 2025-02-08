import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProducts = () => {
  const [datas, setDatas] = useState([]);
  const [updateId, setUpdateId] = useState("");  // Store the ID of the product being edited
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    stock: '',
    description: ''
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/products/get-products");
      setDatas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const updateClick = (product) => {
    setUpdateId(product._id);
    setProductData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description
    });
  };

  const updateProduct = async () => {
    try {
      const res = await axios.put(
        `http://localhost:7000/api/products/update-product/${updateId}`,
        { ...productData }
      );
      console.log(res.data);
      setUpdateId(""); // Clear the update form
      setProductData({ name: '', price: '', stock: '', description: '' }); // Clear fields
      fetchProducts(); // Reload products
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const res = await axios.delete(
        `http://localhost:7000/api/products/delete-product/${productId}`
      );
      console.log(res.data);
      fetchProducts(); // Reload products after deletion
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-4 max-[1200px]:grid-cols-3 max-[800px]:grid-cols-2 max-[500px]:grid-cols-1 gap-8 ">
        {datas &&
          datas.map((product, i) => (
            <div
              key={i}
              className="group relative font-gorditaMedium leading-[40px] shadow-lg p-[3%] rounded-md"
            >
              <div className="group-hover:flex absolute top-[25px] w-full justify-evenly hidden">
                <button
                  onClick={() => updateClick(product)}
                  className="bg-slate-300 rounded-md font-gorditaMedium px-[5%] py-[1%]"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-slate-300 rounded-md font-gorditaMedium px-[5%] py-[1%]"
                >
                  Delete
                </button>
              </div>

              {updateId === product._id && (
                <div className="bg-white absolute w-full top-[125px] p-4">
                  <input
                    value={productData.name}
                    onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                    type="text"
                    placeholder="Name"
                    className="w-full mb-2 p-2 border"
                  />
                  <input
                    value={productData.price}
                    onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                    type="number"
                    placeholder="Price"
                    className="w-full mb-2 p-2 border"
                  />
                  <input
                    value={productData.stock}
                    onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
                    type="number"
                    placeholder="Stock"
                    className="w-full mb-2 p-2 border"
                  />
                  <input
                    value={productData.description}
                    onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                    type="text"
                    placeholder="Description"
                    className="w-full mb-2 p-2 border"
                  />
                  <button
                    onClick={updateProduct}
                    className="bg-slate-300 rounded-md font-gorditaMedium px-[5%] py-[1%]"
                  >
                    Update
                  </button>
                </div>
              )}

              <img
                className="h-[400px] w-full object-cover"
                src={product.imageUrl}
                alt=''
              />
              <h3>{product.name}</h3>
              <p className="font-gordita text-[14px] leading-[17px]">{product.description}</p>
              <h2>Stock: {product.stock}</h2>
              <h3>₹ {product.price}-/</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminProducts;
