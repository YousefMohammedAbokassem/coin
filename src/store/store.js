'use client'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import favoriteSlice from './favoriteSlice'
import cartSlice from './cartSlice'
import loginSlice from './loginSlice'
import categorySlice from './categorySlice'

export const store = configureStore({
    reducer: {
        favorite: favoriteSlice,
        cart : cartSlice,
        login: loginSlice,
        category: categorySlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),  })

