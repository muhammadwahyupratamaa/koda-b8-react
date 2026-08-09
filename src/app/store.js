import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
