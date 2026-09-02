import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,

  reducers: {
    toggleFavorite: (state, action) => {
      const exists = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
      } else {
        state.items.push(action.payload);
      }
    },

    removeFavorite: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

export const {
  toggleFavorite,
  removeFavorite,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;