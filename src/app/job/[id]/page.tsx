"use client";

import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import api from "@/api";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { viewJob } from "@/redux/slices/jobSlice";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  Wallet,
  BookOpen,
  GraduationCap,
  Languages,
  Building2,
} from "lucide-react";

const JobDetail = ({
  icon: Icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: string | string[];
}) => (
  <div className="flex items-start gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20 shadow-sm hover:bg-white/20 transition">
    <Icon className="w-5 h-5 text-teal-400 mt-1 shrink-0" />
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-400">{title}</p>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  </div>
);

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
    dispatch(viewJob(id)).unwrap();
  }, [id, dispatch]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-red-500 text-lg">
          Failed to load job. Please try again.
        </p>
      </div>
    );
  }

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleDelete = () => {
    if (!id) return;
    setDeleteLoading(true);
    api
      .delete(`/job/${id}`)
      .then(() => {
        toast.success("Job deleted successfully");
        router.push("/admin/dashboard?tab=jobs")
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
    <div className="min-h-screen bg-gradient-to-b from-black via-teal-950 to-black py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl p-8">
        {/* Job Title */}
        <h2 className="text-3xl font-bold text-white mb-2">{job.title}</h2>

        {/* Company Link */}
        <Link href={`/company/${job.company._id}`}>
          <p className="text-teal-400 hover:underline text-lg flex items-center gap-2">
            <Building2 className="w-5 h-5" /> {job.company.name}
          </p>
        </Link>

        {/* Job Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <JobDetail icon={MapPin} title="Location" value={job.location} />
          <JobDetail icon={Briefcase} title="Job Type" value={job.jobType} />
          <JobDetail icon={Wallet} title="Salary" value={job.salary} />
          {job.language && job.language.length > 0 && (
            <JobDetail
              icon={Languages}
              title="Language"
              value={Array.isArray(job.language) ? job.language.join(", ") : job.language}
            />
          )}
          <JobDetail
            icon={GraduationCap}
            title="Qualification"
            value={job.qualification}
          />
        </div>

        <div className="mt-10 bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 shadow-sm">
          <h3 className="text-xs uppercase tracking-wide text-gray-400 flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-teal-400" /> Description
          </h3>
          <p className="text-sm text-white leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </div>



        {/* Buttons */}
        <div className="mt-10 flex flex-wrap gap-4">
          {isAdmin ? (
            <>
              <Button
                onClick={() => router.push(`/job/${id}/edit`)}
                variant="contained"
                sx={{
                  backgroundColor: "#14b8a6",
                  "&:hover": { backgroundColor: "#0d9488" },
                  borderRadius: "12px",
                  padding: "8px 20px",
                  textTransform: "none",
                }}
              >
                Edit
              </Button>

              <button
                onClick={handleOpenDialog}
                className="px-5 py-2 rounded-xl bg-teal-700 text-white hover:bg-teal-400 transition"
              >
                Delete Job
              </button>
            </>
          ) : (
            <Button
              onClick={() => router.push(`/job/${id}/apply`)}
              variant="contained"
              sx={{
                backgroundColor: "#1e293b",
                "&:hover": { backgroundColor: "#0f172a" },
                borderRadius: "12px",
                padding: "8px 20px",
                textTransform: "none",
                color: "white",
              }}
            >
              Apply
            </Button>
          )}
        </div>
      </div>

      {/* Delete Dialog */}
      {openDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-6 max-w-sm w-full shadow-xl">
            {/* Title */}
            <h2 className="text-xl font-semibold text-white mb-2">Delete Job</h2>
            <p className="text-gray-300 text-sm mb-6">
              Are you sure you want to delete this job? This action cannot be
              undone.
            </p>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 rounded-xl border border-white/20 bg-white/5 text-gray-300 hover:bg-white/20 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="px-4 py-2 rounded-xl bg-teal-500 text-white font-medium hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewJob;
