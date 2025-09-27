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

export const getCompany = createAsyncThunk(
  "company/get",
  async (id: string) => {
    const res = await api.get(`/company/view/${id}`);
    return res.data.data;   
  }
);

export const addCompany = createAsyncThunk('company/add', async(companyData: FormData) => {
    const res = await api.post('/company/add', companyData);
    return res.data;
})

export const updateCompany = createAsyncThunk(
  "company/update",
  async ({ id, formData }: { id: string; formData: FormData }) => {
    const res = await api.patch(`/company/edit/${id}`, formData);
    return res.data;
  }
);


export const deleteCompany = createAsyncThunk(
  "company/delete",
  async (id: string) => {
    await api.delete(`/company/delete/${id}`);
    return id;
  }
);


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

        // getCompany
        .addCase(getCompany.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCompany.fulfilled, (state, action) => {
            state.loading = false;
            state.company = action.payload;
        })
        .addCase(getCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch company";
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

        //editcompany
        .addCase(updateCompany.pending, state => {
            state.loading = true;
        })
        .addCase(updateCompany.fulfilled, ( state, action ) => {
            state.loading = false;
            state.company = action.payload;
        })
        .addCase(updateCompany.rejected ,(state,action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to edit company'
        })

        //deleteCompany
        .addCase(deleteCompany.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteCompany.fulfilled, (state) => {
            state.loading = false;
            state.company = null;
        })
        .addCase(deleteCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to delete company";
        });
    },
});

export default companySlice.reducer;