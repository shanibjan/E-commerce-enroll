import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for admin login
export const adminLogin = createAsyncThunk(
  "admin/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:7000/api/admin/login",
        { email, password },
        { withCredentials: true }
      );
      return data; // Return the token or admin data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    admin: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.error = null;
      localStorage.removeItem("adminToken"); // Clear the token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload;
        state.error = null;
        localStorage.setItem("adminToken", action.payload.token); // Store the token
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
