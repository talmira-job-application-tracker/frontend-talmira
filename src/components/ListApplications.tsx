"use client";

import api from "@/api";
import { ApplicationType } from "@/types/applicationType";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Link from "next/link";

const ListApplications = () => {
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = JSON.parse(Cookies.get("user") || "{}");
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    setLoading(true);
    api
      .get("/application/list")
      .then((res) => {
        console.log("Applications:", res.data.data)
        setApplications(res.data.data);

        setLoading(false);
        toast.success("Applications fetched successfully");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch applications");
        setLoading(false);
        toast.error("Failed to fetch applications");
      });
  }, []);

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p>{error}</p>;
  if (applications.length === 0) return <p>No applications found</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold mb-4">Job Applications</h1>

      {applications.map((app) => (
        <div
          key={app._id} 
          className="border rounded-md p-4 shadow-sm hover:shadow-md transition"
        >
          {isAdmin && (
            <p>
              <span className="font-semibold">Username:</span>{" "}
              {app.user?.name || "-"}
            </p>
          )}

          <p>
            <strong>Job:</strong>{" "}
            {app.job?.title ||
              (isAdmin ? "Job Deleted" : "This job is no longer available")}
          </p>
          <p>
            <strong>Company:</strong>{" "}
            {app.job
              ? (app.job.company?.name ||
                  (isAdmin ? "Company Deleted" : "This company is no longer available"))
              : "-"}
          </p>

          <p>
            <span className="font-semibold">Applied At:</span>{" "}
            {new Date(app.appliedAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {app.status}
          </p>

          {/* {isAdmin && app.contactInfo && (
            // <div className="mt-2">
            //   <p><span className="font-semibold">Name:</span> {app.contactInfo.name || "-"}</p>
            //   <p><span className="font-semibold">Email:</span> {app.contactInfo.email || "-"}</p>
            //   <p><span className="font-semibold">Phone:</span> {app.contactInfo.phone || "-"}</p>
            // </div>
          )} */}

          <p>
            <span className="font-semibold">Resume:</span>{" "}
            {app.resume ? (
              <a
                href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${app.resume}`}
                target="_blank"
                className="text-blue-600 underline"
              >
                View Resume
              </a>
            ) : (
              "-"
            )}
          </p>

           <div className="mt-3">
            <Link
              href={`/application/${app._id}`}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Application
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListApplications;
