import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./pages/features/productSlice";
import quantityRedeucer from "./pages/features/quantitySlice"

export const store = configureStore({
  reducer: {
    products: productsReducer,
    quantity: quantityRedeucer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch