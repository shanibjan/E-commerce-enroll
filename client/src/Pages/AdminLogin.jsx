import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../redux/slices/adminAuthSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.adminAuth);



  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(adminLogin(values));

      if (result.meta.requestStatus === "fulfilled") {
        alert("Welcome, Admin!"); // You can replace this with a toast
        formik.resetForm(); // Reset form after successful login
        navigate("/admin-dashboard");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="text-center">
        <h1 className="text-[40px] font-gorditaMedium max-[550px]:text-[30px] max-[370px]:text-[25px] font-AbrilRegular text-[#244262]">
          Admin Login
        </h1>
        <h4 className="text-[30px] font-gordita max-[550px]:text-[20px] max-[370px]:text-[15px] font-gorditaRegular text-[#244262] my-[4%]">
          Provide Admin information here
        </h4>

        <div className="mb-[2%]">
          <input
            className="bg-[#EBF5FF] w-[30%] max-[750px]:w-[50%] max-[500px]:w-[60%] py-[1%] px-[2%]"
            type="email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "red", marginTop: "4px" }}>{formik.errors.email}</div>
          )}
        </div>

        <div className="mb-[2%]">
          <input
            className="bg-[#EBF5FF] w-[30%] max-[750px]:w-[50%] max-[500px]:w-[60%] py-[1%] px-[2%]"
            type="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: "red", marginTop: "4px" }}>{formik.errors.password}</div>
          )}
        </div>

        <button
          className="bg-[#94C4F7] py-[1%] px-[5%] font-gorditaBold text-[12px] tracking-[2px] mb-[5%] text-white"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </form>
  );
};

export default AdminLogin;
