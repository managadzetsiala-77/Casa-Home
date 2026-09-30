import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  } catch {
    return [];
  }
};

const initialState = {
  items: getInitialCart(),
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    increaseQuantity: (state, action) => {
      const product = state.items.find(
        (item) => item.id === action.payload,
      );

      if (product) {
        product.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const product = state.items.find(
        (item) => item.id === action.payload,
      );

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload,
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
export const saveCart = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};