"use client";

import { listJobs } from "@/redux/slices/jobSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ListJob = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { job, jobs, loading, error } = useSelector((state: RootState) => state.job);

  useEffect(() => {
    dispatch(listJobs());
  }, [dispatch]);

  return (
    <div>
      <h2>Job List</h2>

      {loading && <p>Loading jobs...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {jobs.length > 0 ? (
        <ul>
          {jobs.map((j) => (
            <li key={j._id}>
              {j.title} - {j.description}-{j.salary}
              <button onClick={() => router.push(`/job/${j._id}`)}>
                View Job
              </button>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No jobs found</p>
      )}

      <div>
        </div>

    </div>
  );
};

export default ListJob;
