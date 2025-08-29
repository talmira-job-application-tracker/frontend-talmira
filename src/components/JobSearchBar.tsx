"use client";

import api from "@/api";
import { JobType } from "@/types/jobType";
import Link from "next/link";
import { useState, useEffect } from "react";

const JobSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");

    api
      .get(`/job/list?query=${encodeURIComponent(searchQuery)}`)
      .then((res) => {
        setResults(res.data.data || []);
      })
      .catch((err: any) => {
        console.error("Error fetching jobs:", err);
        setError(err.response?.data?.message || "Failed to fetch jobs");
        setResults([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        fetchJobs(query);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="p-6 space-y-6">
      {/* Search Box */}
      <div className="flex justify-center ">
        <input
          type="text"
          placeholder="Search jobs ..."
          value={query || ""}
          onChange={(e) => setQuery(e.target.value)}
          className=" px-4 py-3 rounded-2xl bg-white placeholder:text-black/40 
            focus:outline-none focus:ring-1 focus:ring-white/20 
            shadow-md"
        />
      </div>


      {/* Loading / Error */}
      {loading && (
        <p className="text-center text-gray-300 animate-pulse">
          Loading jobs...
        </p>
      )}
      {error && <p className="text-center text-red-400">{error}</p>}

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results.length > 0 ? (
          results.map((job) => (
            <Link key={job._id} href={`/job/${job._id}`}>
              <div
                className="p-5 rounded-2xl 
                  bg-white/10 backdrop-blur-lg 
                  border border-white/20 
                  shadow-md hover:shadow-lg hover:scale-[1.02] 
                  transition transform cursor-pointer"
              >
                <h3 className="font-semibold text-lg text-white">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-300">{job.company?.name}</p>
                <p className="text-xs text-gray-400 mb-3">
                  {job.location} • {job.jobType} • {job.workMode}
                </p>
                <p className="text-sm text-gray-200 line-clamp-3">
                  {job.description}
                </p>
              </div>
            </Link>
          ))
        ) : (
          query.trim() &&
          !loading && (
            <p className="text-gray-400 text-center">
              No jobs match your search.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default JobSearch;
