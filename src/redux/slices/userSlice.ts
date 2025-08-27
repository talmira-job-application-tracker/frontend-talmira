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

//admin viewing by id
export const viewUserById = createAsyncThunk("user/viewUserById", async (id: string, thunkAPI) => {
  try {
    const res = await api.get(`/user/${id}`); 
    return res.data.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch user");
  }
});

export const viewProfile = createAsyncThunk('profile/view', async() => {
    const res = await api.get('/user/view');
 console.log("viewProfile response:", res.data); 
     return res.data;    
})

export const editProfile = createAsyncThunk('profile/edit', async(formData: FormData) => {
    const res = await api.patch('/user/edit', formData);
    console.log("editProfile response:", res.data);  
    return res.data;
})
export const listusers = createAsyncThunk('/listusers', async () => {
    const res = await api.get('/user/list')
    return res.data;
})

//slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder

         // viewUserById
        .addCase(viewUserById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(viewUserById.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(viewUserById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

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

        //list users
        .addCase(listusers.pending, state => {
            state.loading = true;
        })
        .addCase(listusers.fulfilled, (state,action) => {
            state.loading = false;
            state.users = action.payload.data;
        })
        .addCase(listusers.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message || 'failed to list jobs'
        })
    },
});

export default userSlice.reducer;