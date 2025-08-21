import api from "@/api";
import { JobCreateType, JobType } from "@/types/jobType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface jobState {
  jobs: JobType[];
  job: JobType | null;
  loading: boolean;
  error: string | null;
}

const initialState:jobState = {
    jobs: [],
    job: null,
    loading: false,
    error:null,
}

//thunks
//listjob
export const listJobs = createAsyncThunk(
  "job/list",
  async () => {
    const res = await api.get("/job/list");
    return res.data.data as JobType[]; 
  }
);

//addjob
export const addJob = createAsyncThunk('job/add',
  async (formData:JobCreateType) => {
    const res = await api.post('/job/add', formData)
    return res.data.data as JobType
  }
)

//slice
const jobSlice = createSlice({
    name:'job',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder 

        //listjob
        .addCase(listJobs.pending, state => {
            state.loading = true;
            state.error = null;
        })
        .addCase(listJobs.fulfilled, (state,action) => {
            state.loading = false;
            state.jobs = action.payload
        })
        .addCase(listJobs.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch jobs";
        })

        //addjob
        .addCase(addJob.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addJob.fulfilled, (state, action) => {
          state.loading = false;
          state.jobs.push(action.payload);
          toast.success('Job added successfully')
        })

        .addCase(addJob.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to add job';
          toast.error('Failed to add Job')
        });
    },
})

export default jobSlice.reducer;
