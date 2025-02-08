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
      return data; // ✅ Token is now returned in response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Async thunk for admin logout
export const adminLogout = createAsyncThunk("admin/logout", async (_, { dispatch }) => {
  try {
    await axios.post("http://localhost:7000/api/admin/logout", {}, { withCredentials: true });
    localStorage.removeItem("adminToken"); // ✅ Clear localStorage
    dispatch(logout()); // ✅ Clear Redux state
  } catch (error) {
    console.error("Logout failed:", error);
  }
});

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
        state.admin = action.payload.admin;
        state.error = null;
        localStorage.setItem("adminToken", action.payload.token); // ✅ Store token safely
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.admin = null;
        state.error = null;
      });
  },
});

export const { logout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
