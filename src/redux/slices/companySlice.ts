import api from "@/api";
import { CompanyType } from "@/types/companyType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CompanyState {
    companies: CompanyType[];
    company: CompanyType | null;
    loading: boolean;
    error: string | null;
    isRefresh: boolean;
}

const initialState: CompanyState = {
    companies: [],
    company: null,
    loading: false,
    error: null,
    isRefresh: false,
}

//thunks
export const listCompany = createAsyncThunk('company/list', async() => {
    const res =await api.get(`/company/list`);
    return res.data;
});

export const addCompany = createAsyncThunk('company/add', async(companyData: FormData) => {
    const res = await api.post('/company/add', companyData);
    return res.data;
})

//slice
const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder

        //ListCompanies
        .addCase(listCompany.pending, state => {
            state.loading = true;
        })
        .addCase(listCompany.fulfilled, (state, action) => {
            state.loading = false;
            state.companies = action.payload.data;
        })
        .addCase(listCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to list companies'
        })

        //add company
        .addCase(addCompany.pending, state => {
            state.loading = true;
        })
        .addCase(addCompany.fulfilled, (state, action) => {
            state.loading = false;
            state.companies.push(action.payload);
            state.isRefresh = true;
        })
        .addCase(addCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to add company';
        })
    },
});

export default companySlice.reducer;