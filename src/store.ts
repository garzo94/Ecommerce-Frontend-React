import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./pages/features/productSlice";
import quantityRedeucer from "./pages/features/quantitySlice"
import carReducer from './pages/features/carSlice'
import authUserReducer from "./pages/features/authUserSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    quantity: quantityRedeucer,
    car: carReducer,
    login: authUserReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
