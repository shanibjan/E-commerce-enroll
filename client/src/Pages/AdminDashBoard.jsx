import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AdminProducts from "../components/AdminProducts";
import AddProducts from "../components/AddProducts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashBoard = () => {
  const nav = useNavigate();
  const [component, setComponent] = useState("Products");
  const [loading, setLoading] = useState(false); // Manage loading state for logout
  const [error, setError] = useState(""); // Manage error state for logout

  const logOut = async () => {
    setLoading(true); // Disable the button during logout
    try {
      const res = await axios.post("http://localhost:7000/api/admin/logout");
      console.log(res.data);
      nav("/"); // Redirect to home page after successful logout
    } catch (error) {
      setError("Logout failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="py-[5%] px-[10%]">
      <div>
        <div className="flex justify-end mb-[20px]">
          <button
            onClick={logOut}
            className="bg-slate-300 rounded-md font-gorditaMedium px-[2%] py-[1%]"
            disabled={loading} // Disable the button while logging out
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>} {/* Display error message if logout fails */}

        <div className="text-[22px]">
          <div className="rounded-md font-gorditaMedium mb-[20px] bg-slate-400 p-[3%] cursor-pointer font-AbrilRegular text-white flex justify-between">
            <h4 className="w-[90%] text-left" onClick={() => setComponent("Products")}>
              Products
            </h4>
            <div onClick={() => setComponent("AddProducts")}>
              <FontAwesomeIcon icon={faPlus} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Conditional rendering of components */}
      {component === "Products" ? <AdminProducts /> : component === "AddProducts" ? <AddProducts /> : null}
    </div>
  );
};

export default AdminDashBoard;
