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
        setApplications(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch applications");
        setLoading(false);
        toast.error("Failed to fetch applications");
      });
  }, []);

  if (loading) return <p className="text-black text-center">Loading applications...</p>;
  if (error) return <p className="text-black text-center">{error}</p>;
  if (applications.length === 0) return <p className="text-black text-center">No applications found</p>;

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
