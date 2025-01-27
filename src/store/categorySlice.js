"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    error: "",
    data: [],
}

export const category = createAsyncThunk(
  "category/fetch",
  async (token, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;


    return await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}user/categories`, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: builder => {
  builder.addCase(category.pending, state => {
    state.loading = true
    state.error = ""
    state.data = []
  })  
  builder.addCase(category.fulfilled, (state, action) => {
    console.log(" action from fullfilled category")
    state.loading = false
    state.error = ""
    state.data = action.payload.categories
  })
  builder.addCase(category.rejected, (state, action) => {
    console.log("action from rejected category")
    console.log(action)
    state.loading = false
    state.error = action.payload
    state.data = []
  })
}});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
