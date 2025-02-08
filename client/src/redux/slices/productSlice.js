import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to add product
export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:7000/api/products/add-product',
        productData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } // Add token for authorization
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous error
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload); // Add the new product to the list
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
