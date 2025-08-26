"use client";

import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import api from "@/api";
import toast from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { viewJob } from "@/redux/slices/jobSlice";

const ViewJob = () => {
  const params = useParams();
  const user = JSON.parse(Cookies.get("user") || "{}");
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const router = useRouter();

  const isAdmin = user?.role === "admin";

  const dispatch = useDispatch<AppDispatch>();
  const { job, loading, error } = useSelector((state: RootState) => state.job);

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    dispatch(viewJob(id))
      .unwrap()
      // .then(() => toast.success("Fetched job successfully"))
      // .catch(() => toast.error("Failed to fetch job"));
  }, [id, dispatch]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-red-500 text-lg">Failed to load job. Please try again.</p>
      </div>
    );
  }

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleDelete = () => {
    if (!id) return;
    setDeleteLoading(true);
    api.delete(`/job/${id}`)
      .then(() => {
        toast.success("Job deleted successfully");
        router.push("/");
      })
      .catch(() => {
        toast.error("Failed to delete job");
      })
      .finally(() => {
        setDeleteLoading(false);
        setOpenDialog(false);
      });
  };

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-red-400 text-lg">Job not found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Company:</strong> {job.company.name}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Job Type:</strong> {job.jobType}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Language:</strong> {job.language}</p>
      <p><strong>Qualification:</strong> {job.qualification}</p>

      {isAdmin && (
        <>
        <Button
          onClick={() => router.push(`/job/${id}/edit`)}
          color="primary"
          variant="contained"
          sx={{ mt: 2, mr: 2 }}
        >
          Edit
        </Button>

          <Button
            variant="contained"
            color="error"
            sx={{ mt: 2 }}
            onClick={handleOpenDialog}
          >
            Delete Job
          </Button>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Delete Job</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this job?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                color="error"
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default ViewJob;


