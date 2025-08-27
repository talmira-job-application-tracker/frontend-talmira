"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/api";
import toast from "react-hot-toast";
import { ApplicationType } from "@/types/applicationType";

const EditApplicationStatus = () => {
  const { id } = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<ApplicationType>();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/application/${id}`)
      .then((res) => {
        setApplication(res.data.data);
        setStatus(res.data.data.status); 
      })
      .catch(() => toast.error("Failed to fetch application"));
  }, [id]);

  const handleUpdate = () => {
    if (!status) return toast.error("Select a status");

    setLoading(true);
    api.patch(`/application/${id}/status`, { status })
      .then(() => {
        toast.success("Application status updated");
        router.push("/application/list"); // go back to list
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to update status");
      })
      .finally(() => setLoading(false));
  };

  if (!application) return <p>Loading application...</p>;

  return (
    <div className="p-6 border rounded-md shadow-md max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Edit Application Status</h1>

      <p><strong>Job:</strong> {application.job?.title || "Job Deleted"}</p>
      <p><strong>Company:</strong> {application.job?.company?.name || "Company Deleted"}</p>
      <p><strong>User:</strong> {application.user?.name || "-"}</p>
      <p className="mb-4"><strong>Current Status:</strong> {application.status}</p>

      <label className="block mb-2 font-medium">Change Status:</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      >
        <option value="">-- Select --</option>
        <option value="rejected">Rejected</option>
        <option value="selected">Selected</option>
      </select>

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Updating..." : "Update Status"}
      </button>
    </div>
  );
};

export default EditApplicationStatus;
