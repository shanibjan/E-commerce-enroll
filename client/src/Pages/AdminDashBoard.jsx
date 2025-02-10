import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../redux/slices/adminAuthSlice"; // Import the logout action
import AdminProducts from "../components/AdminProducts";
import AddProducts from "../components/AddProducts";
import axios from "axios";

const AdminDashBoard = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  
  const { isLoading } = useSelector((state) => state.adminAuth); // Get admin from Redux store
  const [component, setComponent] = useState("Products");
  const [error, setError] = useState(""); // Manage error state for logout

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await axios.get("http://localhost:7000/api/admin/profile", { withCredentials: true });
        console.log("Admin Data:", data);
      } catch (error) {
        console.log(error);
        
        nav("/admin-login"); // Redirect if authentication fails
      }
    };
    fetchAdmin();
  }, [nav]);

  //  Logout Handler
  const logOut = async () => {
    try {
      await dispatch(adminLogout()).unwrap(); // Dispatch Redux logout action
      nav("/"); // Redirect to home page after successful logout
    } catch (error) {
      setError("Logout failed. Please try again.");
    }
  };

  //  Show loading message while authentication check is in progress
  if (isLoading) return <p>Loading...</p>;

  
  

  return (
    <div className="py-[5%] px-[10%]">
      <div>
        <div className="flex justify-end mb-[20px]">
          <button
            onClick={logOut}
            className="bg-slate-300 rounded-md font-gorditaMedium px-[2%] py-[1%]"
            disabled={isLoading} // Disable the button while logging out
          >
            {isLoading ? "Logging out..." : "Logout"}
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
