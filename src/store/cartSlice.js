'use client'
import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
  if (typeof localStorage === 'undefined') {
    return [];
  }

  const storedCart = localStorage.getItem('cart-product');
  return storedCart ? JSON.parse(storedCart) : [];
};



const initialState = getInitialState();




const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      
      // Check if the product already exists in the cart
      const existingProductIndex = state.findIndex(
        (item) => item.id === product.id && item.variant_id === product.variant_id
      );
      
      if (existingProductIndex !== -1) {
        // If the product exists, remove it from the cart
        state.splice(existingProductIndex, 1);
      } else {
        // Add the product to the state
        state.push(product);
      }
      
      // Save the updated state to localStorage
      localStorage.setItem('cart-product', JSON.stringify(state));
    },
    removeFromCart(state, action) {
      const { id, variant_id } = action.payload;
      
      // Find the index of the product to remove in the cart
      const productIndex = state.findIndex(
        (item) => item.id === id && item.variant_id === variant_id
      );
      
      if (productIndex !== -1) {
        // If found, remove the product from the cart
        state.splice(productIndex, 1);
      }
      
      // Save the updated state to localStorage
      localStorage.setItem('cart-product', JSON.stringify(state));
    },
    emptyCart(state) {
      // Set the state to an empty array
      state.splice(0, state.length);
      
      // Save the updated state to localStorage
      localStorage.setItem('cart-product', JSON.stringify(state));
    },
    addOne(state, action) {
      const { id, variant_id } = action.payload;
      
      // Find the product in the cart
      const product = state.find(
        (item) => item.id === id && item.variant_id === variant_id
      );
      
      if (product) {
        // If found, increment the amount by one
        product.ammount += 1;
        product.total_price = product.price * product.ammount
      }
      
      // Save the updated state to localStorage
      localStorage.setItem('cart-product', JSON.stringify(state));
    },
    minusOne(state, action) {
      const { id, variant_id } = action.payload;
      
      // Find the product in the cart
      const product = state.find(
        (item) => item.id === id && item.variant_id === variant_id
      );
      
      if (product && product.ammount > 1) {
        // If found and amount > 1, decrement the amount by one
        product.ammount -= 1;
        product.total_price = product.price * product.ammount;
      }
      
      // Save the updated state to localStorage
      localStorage.setItem('cart-product', JSON.stringify(state));
    },
  },
});
export default cartSlice.reducer;
export const { addToCart, removeFromCart, emptyCart, addOne, minusOne } = cartSlice.actions;