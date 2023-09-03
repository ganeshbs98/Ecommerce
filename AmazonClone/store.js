import { configureStore } from "@reduxjs/toolkit";
import CartReducers from "./redux/CartReducers";

export default configureStore({
  reducer: {
    cart: CartReducers,
  },
});
