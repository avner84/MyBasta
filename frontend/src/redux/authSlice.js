import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for authentication
const initialState = {
  isAuthenticated: false,
};

// Create a slice for authentication
const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    // Reducer for handling login action
    login: (state) => {
      // Update isAuthenticated to true when logged in
      state.isAuthenticated = true;
    },
    // Reducer for handling logout action
    logout: (state) => {
      // Update isAuthenticated to false when logged out
      state.isAuthenticated = false;
    },
  },
});


export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
