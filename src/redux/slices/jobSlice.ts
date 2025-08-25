import api from "@/api";
import { JobEditType } from "@/app/job/[id]/edit/page";
import { JobCreateType, JobType } from "@/types/jobType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface jobState {
  jobs: JobType[];
  job: JobType | null;
  loading: boolean;
  error: string | null;
  isRefresh: boolean;
}

const initialState:jobState = {
    jobs: [],
    job: null,
    loading: false,
    error:null,
    isRefresh: false,
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

//add job
export const addJob = createAsyncThunk('job/add',
  async (formData:JobCreateType) => {
    const res = await api.post('/job/add', formData)
    return res.data.data as JobType
  }
)

// View Job
// export const viewJob = createAsyncThunk('job/view', async (id: string) => {
//   const res = await api.get(`/job/${id}`)
//   console.log("View profile response:", res.data)
//   return res.data;
//  }
// )

// View Job
export const viewJob = createAsyncThunk('job/view', async (id: string) => {
  const res = await api.get(`/job/${id}`);
  return res.data.data as JobType;  
});


//Edit Job
export const editJob = createAsyncThunk<JobType, {id: string; jobData: JobEditType}>('job/edit',
  async ({id, jobData}) => {
    const res = await api.patch(`/job/${id}`, jobData);
    return res.data.data;
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
        })

        //View Job
        .addCase(viewJob.pending, state => {
          state.loading = true;
        })
        .addCase(viewJob.fulfilled, (state, action) => {
          state.loading = false;
          state.job = action.payload;  
        })

        .addCase(viewJob.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to load job';
        })

        //edit job
        .addCase(editJob.pending, state => {
          state.loading = true;
          state.error = null;
        })

        .addCase(editJob.fulfilled, (state, action) => {
          state.loading = false;
          state.job = (action.payload);
        })

        .addCase(editJob.rejected, (state,action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to edit Job';
        })
    },
})

export default jobSlice.reducer;
