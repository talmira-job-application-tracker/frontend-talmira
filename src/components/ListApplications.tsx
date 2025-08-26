"use client";

import api from "@/api";
import { ApplicationType } from "@/types/applicationType";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

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
              <span className="font-semibold">User:</span>{" "}
              {app.user?.name || "-"}
            </p>
          )}

          <p>
            <span className="font-semibold">Job:</span> {app.job?.title}
          </p>
          <p>
            <span className="font-semibold">Company:</span>{" "}
            {app.job?.company?.name || "-"}
          </p>
          <p>
            <span className="font-semibold">Applied At:</span>{" "}
            {new Date(app.appliedAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {app.status}
          </p>

          {isAdmin && (
            <p>
              <span className="font-semibold">Contact:</span>{" "}
              {app.contactInfo
                ? `${app.contactInfo.name || ""} ${app.contactInfo.email || ""} ${app.contactInfo.phone || ""}`
                : "-"}
            </p>
          )}

          <p>
            <span className="font-semibold">Resume:</span>{" "}
            {app.resume ? (
              <a
                href={app.resume}
                target="_blank"
                className="text-blue-600 underline"
              >
                View Resume
              </a>
            ) : (
              "-"
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListApplications;
