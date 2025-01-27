"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: "",
  data: [],
};

export const fetchFavorite = createAsyncThunk(
  "fetch/fetchFavorite",
  async (token, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;


    return await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}user/favorites`, {
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

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    removeFavorite: (state, action) => {
      const productId = action.payload;
      state.data = state.data.filter(product => product.id !== productId);
    },
    addFavorite: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavorite.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.data = [];
    });
    builder.addCase(fetchFavorite.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload.products;
    });
    builder.addCase(fetchFavorite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    });
  },
});

export default favoriteSlice.reducer;

export const { removeFavorite, addFavorite } = favoriteSlice.actions;

