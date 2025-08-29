// "use client";

// import { listJobs } from "@/redux/slices/jobSlice";
// import { AppDispatch, RootState } from "@/redux/store";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const ListJob = () => {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const { job, jobs, loading, error } = useSelector((state: RootState) => state.job);

//   useEffect(() => {
//     dispatch(listJobs());
//   }, [dispatch]);

//   const handleSearch = (query: any) => {
//     dispatch(listJobs(query));
//   };

//   return (
//     <div>
//       <h2>Job List</h2>

//       {loading && <p>Loading jobs...</p>}
//       {error && <p style={{ color: "red" }}>Error: {error}</p>}

//       {jobs.length > 0 ? (
//         <ul>
//           {jobs.map((j) => (
//             <li key={j._id}>
//               {j.title} - {j.description}-{j.salary}
//               <button onClick={() => router.push(`/job/${j._id}`)}>
//                 View Job
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         !loading && <p>No jobs found</p>
//       )}

//       <div>
//         </div>

//     </div>
//   );
// };

// export default ListJob;

// "use client";

// import { listJobs } from "@/redux/slices/jobSlice";
// import { AppDispatch, RootState } from "@/redux/store";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// const ListJob = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { jobs, loading, error } = useSelector((state: RootState) => state.job);
//   const router = useRouter();

//   useEffect(() => {
//     dispatch(listJobs());
//   }, [dispatch]);

//   return (
//     <div className="min-h-screen bg-white px-8 py-6"> 
//       <div className="flex gap-6 mt-6">
//         {/* Left: Job List */}
//         <div className="w-full h-[80vh] overflow-y-auto space-y-4 pr-2">
//           {loading && <p className="text-gray-600">Loading jobs...</p>}
//           {error && <p className="text-red-500">Error: {error}</p>}

//           {jobs.length > 0 ? (
//             jobs.map((job) => (
//               <div
//                 // key={job._id}
//                 // onClick={() => router.push(`/job/${job._id}`)} // 🔗 navigate to view page
//                 // className="p-4 border rounded-xl shadow-sm cursor-pointer transition hover:shadow-md hover:border-[#309689]"
//               >
//                 {/* Job Title */}
//                 <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>

//                 {/* Company */}
//                 <p className="text-sm text-gray-600 mb-2">{job.company?.name}</p>

//                 {/* Row: Salary, Location, JobType */}
//                 <div className="flex items-center gap-4 text-sm text-gray-600">
//                   <span className="flex items-center gap-1">
//                     <Image src="/icons/salary.svg" alt="Salary" width={16} height={16} />
//                     {job.salary || "N/A"}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Image src="/icons/location.svg" alt="Location" width={16} height={16} />
//                     {job.location || "N/A"}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Image src="/icons/clock.svg" alt="Job Type" width={16} height={16} />
//                     {job.jobType || "Full Time"}
//                   </span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             !loading && <p className="text-gray-500">No jobs found</p>
//           )}
//         </div>

//         {/* Right: Placeholder since details page exists
//         <div className="flex-1 bg-white border rounded-xl shadow p-6 min-h-[80vh] flex items-center justify-center text-gray-500">
//           👈 Select a job from the list to view details
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default ListJob;



"use client";

import { listJobs, viewJob } from "@/redux/slices/jobSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import api from "@/api";
import toast from "react-hot-toast";
import Link from "next/link";

const ListJob = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, job, loading, error } = useSelector((state: RootState) => state.job);
  const router = useRouter();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const user = JSON.parse(Cookies.get("user") || "{}");
  const isAdmin = user?.role === "admin";

  // ✅ Fetch all jobs
  useEffect(() => {
    dispatch(listJobs());
  }, [dispatch]);

  // ✅ Fetch selected job when user clicks
  useEffect(() => {
    if (selectedId) {
      dispatch(viewJob(selectedId));
    }
  }, [dispatch, selectedId]);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleDelete = () => {
    if (!selectedId) return;
    setDeleteLoading(true);
    api
      .delete(`/job/${selectedId}`)
      .then(() => {
        toast.success("Job deleted successfully");
        setSelectedId(null); // clear selected job
        dispatch(listJobs()); // refresh list
      })
      .catch(() => {
        toast.error("Failed to delete job");
      })
      .finally(() => {
        setDeleteLoading(false);
        setOpenDialog(false);
      });
  };

return (
  <div className="min-h-screen bg-white px-8 py-6">
    <div className="h-[80vh] overflow-y-auto space-y-4">
      {loading && <p className="text-gray-600">Loading jobs...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {jobs.length > 0 ? (
        jobs.map((job: any) => (
          <div
            key={job._id}
            className="flex items-center justify-between p-4 border rounded-xl shadow-sm transition hover:shadow-md hover:border-[#309689]"
          >
            {/* ✅ Left side: Job info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{job.company?.name}</p>

              <div className="flex items-center gap-4 text-sm text-gray-600">
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
                  <Image src="/icons/laptop.png" alt="Work Mode" width={16} height={16} />
                  {job.workMode || "On-site"}
                </span>
              </div>
            </div>

            <Link
              href={`/job/${job._id}`}
              className="px-3 py-2 bg-[#309689] text-white rounded-lg shadow hover:bg-[#26776d] transition"
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
)

};

export default ListJob;
