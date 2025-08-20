import api from "@/api";
import { UserType } from "@/types/userType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
    user: UserType | null;
    users: UserType[];
    loading: boolean;
    error: string | null;
    isRefresh: boolean;
}

const initialState: UserState = {
    user: null,
    users: [],
    loading: false,
    error: null,
    isRefresh: false,
}

export const viewProfile = createAsyncThunk('profile/view', async() => {
    const res = await api.get('/user/view');
    return res.data;
})

export const editProfile = createAsyncThunk('profile/edit', async(formData: FormData) => {
    const res = await api.patch('/user/edit', formData);
    return res.data;
})

//slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder

        //viewProfile
        .addCase(viewProfile.pending, state => {
            state.loading = true;
        })
        .addCase(viewProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data;
        })
        .addCase(viewProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to view profile'
        })

        //editProfile
        .addCase(editProfile.pending, state => {
            state.loading = true;
        })
        .addCase(editProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data;
        })
        .addCase(editProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to edit profile'
        })
    },
});

export default userSlice.reducer;