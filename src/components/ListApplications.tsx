

"use client";

import api from "@/api";
import { ApplicationType } from "@/types/applicationType";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { Briefcase, Building2, Calendar, FileText, User } from "lucide-react";
import Pagination from "@/components/Pagination"; // adjust path if needed
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const ListApplications = () => {
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const fetchApplications = async (pageNum: number, append = false) => {
    try {
      setLoading(true);
      const res = await api.get(`/application/list?page=${pageNum}&limit=10`);
      setApplications((prev) =>
        append ? [...prev, ...res.data.data] : res.data.data
      );
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    const user = JSON.parse(Cookies.get("user") || "{}");
    setIsAdmin(user?.role === "admin");
    fetchApplications(1, false);
  }, []);

  // infinite scroll on mobile
  useInfiniteScroll(
    () => {
      if (page < totalPages && !loading) {
        fetchApplications(page + 1, true);
      }
    },
    isMobile
  );

  if (loading && applications.length === 0)
    return <p className="text-gray-700 text-center mt-10">Loading applications...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (isAdmin === null) return null;

  if (applications.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        {isAdmin ? (
          <p className="text-gray-500 text-lg font-medium">
            📭 No job applications have been submitted yet
          </p>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-gray-600 text-lg font-medium text-center">
              ✨ You haven’t applied to any jobs yet. Start applying to see them here!
            </p>
            <Link
              href="/"
              className="px-4 py-2 bg-[#309689] hover:bg-[#26786f] 
                         text-white font-semibold rounded-lg shadow-md 
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
    <div className="py-16 max-w-5xl mx-auto px-4">
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="flex justify-between items-center rounded-xl p-5 
                       bg-gradient-to-r from-white/30 to-white/10 backdrop-blur-md 
                       border border-white/20 shadow-md hover:shadow-lg transition"
          >
            <div className="space-y-1">
              {isAdmin && (
                <p className="flex items-center gap-2 text-lg font-semibold ">
                  <User size={18} className="text-[#26786d]" /> {app.user?.name || "-"}
                </p>
              )}

              <p className="flex items-center gap-2 text-gray-900">
                <Briefcase size={16} className="text-[#26786d]" />
                <span className="font-semibold ">
                  {app.job?.title ||
                    (isAdmin ? "Job Deleted" : "This job is no longer available")}
                </span>
              </p>

              <p className="flex items-center gap-2 text-sm text-gray-700">
                <Building2 size={16} className="text-[#26786d]" />
                {app.job?.company?.name || "N/A"}
              </p>
               <p className="flex items-center gap-2 text-sm text-teal-800">
              <FileText size={16} className="text-[#26786d]" />
              <span className="font-semibold">Status:</span> {app.status}
            </p>
              <p className="flex items-center gap-2 text-sm text-gray-700">
                <Calendar className="text-[#26786d]" size={16} />
                <span className="font-semibold">Applied At:</span>{" "}
                {app.appliedAt
                  ? new Date(app.appliedAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <Link
              href={`/application/${app._id}`}
              className="px-4 py-2 bg-[#309689] hover:bg-[#26786f] 
                         text-white font-semibold rounded-lg shadow-md 
                         transition-transform transform hover:scale-105"
            >
              View
            </Link>
          </div>
        ))}
      </div>

      {/* desktop pagination */}
      {!isMobile && (
        <div className="flex justify-center mt-8">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(p) => fetchApplications(p, false)}
          />
        </div>
      )}
    </div>
  );
};

export default ListApplications;