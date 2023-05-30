import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productsActions';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    //...
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProducts.pending, (state) => {
      // Set the status to 'loading' when the fetchProducts async thunk is pending
      state.status = 'loading';
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      // Set the status to 'succeeded' and update the products state when the fetchProducts async thunk is fulfilled
      state.status = 'succeeded';
      state.products = action.payload;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      // Set the status to 'failed' and store the error message when the fetchProducts async thunk is rejected
      state.status = 'failed';
      state.error = action.error.message;
    });
},
});

export default productsSlice.reducer;
