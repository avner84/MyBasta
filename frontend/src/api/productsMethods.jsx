import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from './axios';

const GET_PRODUCTS_URL = '/api/products/fetchProducts';

const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
      const response = await axios.get(GET_PRODUCTS_URL);
      console.log('response :', response.data);
      
      return response.data;
    }
  );

export {fetchProducts}