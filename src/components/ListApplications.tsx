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
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); 

  useEffect(() => {
    const user = JSON.parse(Cookies.get("user") || "{}");
    setIsAdmin(user?.role === "admin");

    setLoading(true);
    api
      .get("/application/list")
      .then((res) => {
        setApplications(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch applications");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-black text-center">Loading applications...</p>;
  }

  if (error) {
    return <p className="text-black text-center">{error}</p>;
  }

  if (isAdmin === null) {
    return null;
  }

  if (applications.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        {isAdmin ? (
          <p className="text-gray-500 text-lg font-medium">
            📭 No job applications have been submitted yet
          </p>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-gray-600 text-lg font-medium">
              ✨ You haven’t applied to any jobs yet. Start applying to see them here!
            </p>
            <Link
              href="/job"
              className="px-4 py-2 bg-[#309689] hover:bg-[#26786f] 
                         text-white font-medium rounded-lg shadow-sm 
                         transition-transform transform hover:scale-105"
            >
              Browse Jobs
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="flex justify-between items-center rounded-xl p-5 
                       bg-white/40 backdrop-blur-md border border-white/20 
                       shadow-sm hover:shadow-md transition"
          >
            <div>
              {isAdmin && (
                <p className="text-lg font-semibold text-black">
                  {app.user?.name || "-"}
                </p>
              )}
              <p className="text-sm text-gray-700">
                {app.job?.title ||
                  (isAdmin ? "Job Deleted" : "This job is no longer available")}
              </p>
            </div>

            <Link
              href={`/application/${app._id}`}
              className="px-4 py-2 bg-[#309689] hover:bg-[#26786f] 
                         text-white font-medium rounded-lg shadow-sm 
                         transition-transform transform hover:scale-105"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListApplications;
