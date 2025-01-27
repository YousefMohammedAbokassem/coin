  'use client'
  import { createSlice } from "@reduxjs/toolkit";

  const loginSlice = createSlice({
    name: "login",
    initialState: false,
    reducers: {
      toggleDrawer: (state) => !state, // Toggle the state between true and false
      closeDrawer: () => false, // Return false to close the drawer
    },
  });
  
  export const { toggleDrawer, closeDrawer } = loginSlice.actions;
  export default loginSlice.reducer;