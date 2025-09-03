"use client";

import { listJobs } from "@/redux/slices/jobSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";

const ListJob = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error } = useSelector((state: RootState) => state.job);

  useEffect(() => {
    dispatch(listJobs());
  }, [dispatch]);

  return (
    <div className="min-h-screen px-4 sm:px-8 py-6">
      <div className="space-y-4">
        {loading && <p className="text-gray-600">Loading jobs...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {jobs.length > 0 ? (
          jobs.map((job: any) => (
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
          ))
        ) : (
          !loading && <p className="text-gray-500">No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default ListJob;
