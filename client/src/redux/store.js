import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./slices/adminAuthSlice";
import productReducer from "./slices/productSlice"; 

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    product: productReducer, 
  },
});
