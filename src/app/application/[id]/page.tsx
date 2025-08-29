
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/api";
import { ApplicationType } from "@/types/applicationType";
import toast from "react-hot-toast";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const ViewApplication = () => {
  const { id } = useParams();
  const [application, setApplication] = useState<ApplicationType>();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<ApplicationType["status"] | "">("");
  const [updating, setUpdating] = useState(false);

  const user = JSON.parse(Cookies.get("user") || "{}");
  const isAdmin = user?.role === "admin";

  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    setLoading(true);
    api
      .get(`/application/${id}`)
      .then((res) => {
        setApplication(res.data.data);
        setStatus(res.data.data.status);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdateStatus = () => {
    if (!status) return toast.error("Please select a status");

    setUpdating(true);
    api
      .patch(`/application/${id}/status`, { status })
      .then(() => {
        toast.success("Status updated successfully");
        if (application) {
          setApplication({ ...application, status });
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to update status");
      })
      .finally(() => setUpdating(false));
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  //delete application
  const handleDelete = async (res : any) => {
    res = await api.delete(`/application/${id}`)
    .then(()=> {
      toast.success("Application deleted");
      router.push("/");
    })
    .catch(()=> toast.error("Failed to delete"))
    .finally(() => setOpenDialog(false));
  }
  

  if (loading) return <p>Loading...</p>;
  if (!application) return <p>No application found</p>;

  return (
    <div className="p-6 border rounded-md shadow-md space-y-2">
      <h1 className="text-xl font-semibold mb-4">Application Details</h1>

      <p>
        <strong>Job:</strong> {application.job?.title || "Job Deleted"}
      </p>
      <p>
        <strong>Company:</strong>{" "}
        {application.job?.company?.name || "Company Deleted"}
      </p>
      <p>
        <strong>Status:</strong> {application.status}
      </p>
      <p>
        <strong>Applied At:</strong>{" "}
        {application.appliedAt
          ? new Date(application.appliedAt).toLocaleDateString()
          : "-"}
      </p>

      {application.contactInfo && (
        <div className="mt-2">
          <p>
            <strong>Name:</strong> {application.contactInfo.name || "-"}
          </p>
          <p>
            <strong>Email:</strong> {application.contactInfo.email || "-"}
          </p>
          <p>
            <strong>Phone:</strong> {application.contactInfo.phone || "-"}
          </p>
        </div>
      )}

      <p>
        <strong>Resume:</strong>{" "}
        {application.resume ? (
          <a
            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${application.resume}`}
            target="_blank"
            className="text-blue-600 underline"
          >
            View Resume
          </a>
        ) : (
          "-"
        )}
      </p>

      {isAdmin && (
        <div className="mt-6 p-4 border-t">
          <h2 className="text-lg font-semibold mb-2">Edit Application Status</h2>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as ApplicationType["status"])
            }
            className="border p-2 rounded bg-black w-full mb-3"
          >
            <option value="" disabled>-- Select Status --</option>
            <option value="rejected">Rejected</option>
            <option value="selected">Selected</option>
          </select>

          <button
            onClick={handleUpdateStatus}
            disabled={updating}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {updating ? "Updating..." : "Update Status"}
          </button>
        </div>
      )}

      <Button
        variant="contained"
        className="mt-4 !bg-[#26786f] hover:!bg-[#309689] !text-white !rounded-full shadow-md"
        onClick={handleOpenDialog}
      >
        Delete Application
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Application</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this application?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewApplication;
