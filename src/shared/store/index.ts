import authReducer from "@/features/auth/authSlice";
import filtersReducer from "@/features/movies/filtersSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: { auth: authReducer, filters: filtersReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
