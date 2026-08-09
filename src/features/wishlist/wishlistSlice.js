import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    setWishlist(state, action) {
      state.items = action.payload;
    },

    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const { setWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
