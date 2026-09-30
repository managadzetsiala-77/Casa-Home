import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";

const loadState = () => {
  try {
    const cartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    const favoriteItems =
      JSON.parse(localStorage.getItem("favoriteItems")) || [];

    return {
      cart: {
        items: cartItems,
      },
      favorites: {
        items: favoriteItems,
      },
    };
  } catch {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },

  preloadedState: loadState(),
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem(
    "cartItems",
    JSON.stringify(state.cart.items)
  );

  localStorage.setItem(
    "favoriteItems",
    JSON.stringify(state.favorites.items)
  );
});