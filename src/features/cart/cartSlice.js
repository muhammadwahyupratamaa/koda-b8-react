import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart(state, action) {
      const { product, qty = 1, color = "" } = action.payload;

      const existing = state.items.find(
        (item) => item.id === product.id && item.color === color,
      );

      if (existing) {
        if (existing.qty + qty <= existing.stock) {
          existing.qty += qty;
        }
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          priceDisc: product.priceDisc,
          stock: product.stock,
          qty,
          color,
        });
      }
    },

    increaseQty(state, action) {
      const id = action.payload;

      const item = state.items.find((item) => item.id === id);

      if (item && item.qty < item.stock) {
        item.qty += 1;
      }
    },

    decreaseQty(state, action) {
      const id = action.payload;

      const item = state.items.find((item) => item.id === id);

      if (!item) return;

      if (item.qty > 1) {
        item.qty -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== id);
      }
    },

    removeItem(state, action) {
      const id = action.payload;

      state.items = state.items.filter((item) => item.id !== id);
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
