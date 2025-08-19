import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice"
import companyReducer from "@/redux/slices/companySlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
