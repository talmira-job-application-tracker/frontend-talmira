// import api from "@/api";
// import { UserType } from "@/types/userType";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// interface AuthState {
//   user: UserType | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// //thunk
// //register
// export const register = createAsyncThunk<UserType, FormData>(
//   "auth/register", // redux action type
//   async (formData) => {
//     return api
//       .post("/auth/register", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       })
//       .then((res) => {
//         const { data: user, token } = res.data
//         localStorage.setItem("token", token)
//         localStorage.setItem("user", JSON.stringify(user))
//         return user
//       })
//       .catch((error) => {
//         throw error.response?.data?.message || "Registration failed"
//       })
//   }
// )