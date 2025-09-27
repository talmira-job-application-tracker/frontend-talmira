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
  currentPage: number;
  totalPages: number;
  totalJobs: number;
  hasFetched: boolean;
}

const initialState: jobState = {
  jobs: [],
  job: null,
  loading: false,
  error: null,
  isRefresh: false,
  currentPage: 1,
  totalPages: 1,
  totalJobs: 0,
  hasFetched: false,
};

// Updated listJobs thunk with filters
export const listJobs = createAsyncThunk(
  "job/list",
  async ({
    page,
    limit,
    query,
    location,
    jobType,
    workMode,
  }: {
    page: number;
    limit: number;
    append: boolean;
    query?: string;
    location?: string;
    jobType?: string;
    workMode?: string;
  }) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(query && { query }),
      ...(location && { location }),
      ...(jobType && { jobType }),
      ...(workMode && { workMode }),
    });

    const res = await api.get(`/job/list?${params.toString()}`);
    return res.data;
  }
);

// Add Job thunk
export const addJob = createAsyncThunk("job/add", async (formData: JobCreateType) => {
  const res = await api.post("/job/add", formData);
  return res.data.data as JobType;
});

// View Job thunk
export const viewJob = createAsyncThunk("job/view", async (id: string) => {
  const res = await api.get(`/job/${id}`);
  return res.data.data as JobType;
});

// Edit Job thunk
export const editJob = createAsyncThunk<JobType, { id: string; jobData: JobEditType }>(
  "job/edit",
  async ({ id, jobData }) => {
    const res = await api.patch(`/job/${id}`, jobData);
    return res.data.data;
  }
);

// Slice
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // listJobs
      .addCase(listJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listJobs.fulfilled, (state, action) => {
        state.loading = false;

        const append = action.meta.arg.append;

        if (append) {
          state.jobs = [...state.jobs, ...action.payload.data];
        } else {
          state.jobs = action.payload.data;
        }

        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalJobs = action.payload.totalJobs;
      })
      .addCase(listJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch jobs";
      })

      // addJob
      .addCase(addJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload);
        toast.success("Job added successfully");
      })
      .addCase(addJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add job";
        toast.error("Failed to add Job");
      })

      // viewJob
      .addCase(viewJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.hasFetched = false;
      })
      .addCase(viewJob.fulfilled, (state, action) => {
        state.loading = false;
        state.job = action.payload;
        state.hasFetched = true;
      })
      .addCase(viewJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load job";
        state.hasFetched = true;
      })

      // editJob
      .addCase(editJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.loading = false;
        state.job = action.payload;
      })
      .addCase(editJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to edit Job";
      });
  },
});

export default jobSlice.reducer;
