import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';
const GET_PRODUCTS_URL = '/api/products/fetchProducts';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get(GET_PRODUCTS_URL);
    return response.data;
  }
);