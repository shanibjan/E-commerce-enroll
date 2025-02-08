import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const nav = useNavigate();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/products/get-products");
      setDatas(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const navToAdminLogin = () => {
    nav("/admin-login");
  };

  if (loading) {
    return <div>Loading products...</div>; // Loading message or spinner
  }

  if (error) {
    return <div>{error}</div>; // Error message
  }

  return (
    <div className="p-[3%]">
      <div className="flex justify-between mb-[30px]">
        <h1 className="font-gorditaMedium text-[35px]">E-commerce</h1>
        <button onClick={navToAdminLogin} className="bg-slate-300 rounded-md font-gorditaMedium px-[2%] py-[1%]">
          Admin
        </button>
      </div>

      <div className="grid grid-cols-4 max-[1200px]:grid-cols-3 max-[800px]:grid-cols-2 max-[500px]:grid-cols-1 gap-8">
        {datas &&
          datas.map((product) => (
            <div key={product._id} className="font-gorditaMedium leading-[40px] shadow-lg p-[3%] rounded-md">
              <img className="h-[400px] object-cover w-full" src={product.imageUrl} alt={product.name} />
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

export default Products;
