"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { listJobs } from "@/redux/slices/jobSlice";
import Pagination from "./Pagination";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import Image from "next/image";
import Link from "next/link";

export default function ListJob() {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error, currentPage, totalPages } = useSelector(
    (state: RootState) => state.job
  );
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Initial fetch (page 1)
  useEffect(() => {
    dispatch(listJobs({ page: 1, limit: 10, append: false }));
  }, [dispatch]);

  // Infinite scroll only on mobile
  useInfiniteScroll(
    () => {
      if (currentPage < totalPages && !loading) {
        dispatch(listJobs({ page: currentPage + 1, limit: 10, append: true }));
      }
    },
    isMobile
  );

  return (
    <div className="min-h-screen px-4 sm:px-8 py-6">
      {loading && <p className="text-gray-600">Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job: any) => (
            <div
              key={job._id}
              className="flex flex-col sm:flex-row sm:items-center bg-white/80
                         justify-between p-4 border rounded-xl shadow-sm 
                         transition hover:shadow-md hover:border-[#309689] gap-3"
            >
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{job.company?.name}</p>

                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Image src="/icons/salary.svg" alt="Salary" width={16} height={16} />
                    {job.salary || "N/A"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Image src="/icons/location.svg" alt="Location" width={16} height={16} />
                    {job.location || "N/A"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Image src="/icons/clock.svg" alt="Job Type" width={16} height={16} />
                    {job.jobType || "Full Time"}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#309689"
                    >
                      <path d="M4 5c-1.1 0-2 .9-2 2v9h20V7c0-1.1-.9-2-2-2H4zm0 2h16v7H4V7zm-2 11v2h20v-2H2z" />
                    </svg>
                    {job.workMode || "On-site"}
                  </span>
                </div>
              </div>

              <Link
                href={`/job/${job._id}`}
                className="w-full sm:w-auto text-center px-4 py-2 
                           bg-[#309689] text-white text-sm sm:text-base 
                           rounded-lg shadow hover:bg-[#26776d] transition self-start sm:self-auto"
              >
                Job Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-gray-500">No jobs found</p>
      )}

      {/* Desktop pagination */}
      {!isMobile && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => dispatch(listJobs({ page, limit: 10, append: false }))}
        />
      )}
    </div>
  );
}
