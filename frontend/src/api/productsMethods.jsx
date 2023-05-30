import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axios";

const GET_PRODUCTS_URL = "/api/products/fetchProducts";

// Async thunk to fetch products data from the server
const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  // Make an HTTP GET request to fetch products data
  const response = await axios.get(GET_PRODUCTS_URL);
  console.log("response :", response.data);

  // Return the fetched products data
  return response.data;
});

export { fetchProducts };
