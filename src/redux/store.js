import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsReducer.js";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;
