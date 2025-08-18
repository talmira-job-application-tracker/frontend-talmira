import api from "@/api";
import { UserType } from "@/types/userType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: UserType | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Register thunk
export const registerUser = createAsyncThunk<any, FormData>(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    return api
      .post("/auth/register", formData)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response?.data || err.message));
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data; // just store user
        state.isAuthenticated = true;     
      })
      .addCase(registerUser.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
