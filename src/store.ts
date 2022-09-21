import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./pages/features/productSlice";
import quantityRedeucer from "./pages/features/quantitySlice"
import carReducer from './pages/features/carSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    quantity: quantityRedeucer,
    car: carReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
