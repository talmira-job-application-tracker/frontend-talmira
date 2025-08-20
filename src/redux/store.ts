import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice"
import userReducer from "@/redux/slices/userSlice"
import companyReducer from "@/redux/slices/companySlice"
import jobReducer from "@/redux/slices/jobSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    company: companyReducer,
    job: jobReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
