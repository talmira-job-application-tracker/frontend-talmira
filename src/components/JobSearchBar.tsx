
"use client";

import api from "@/api";
import { JobType } from "@/types/jobType";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const JobSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchJobs = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError("");

    api
      .get(`/job/list?query=${encodeURIComponent(searchQuery)}`)
      .then((res) => setResults(res.data.data || []))
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setError(err.response?.data?.message || "Failed to fetch jobs");
        setResults([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) fetchJobs(query);
      else setResults([]);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
  <div className="relative w-full max-w-2xl mx-auto mt-6" ref={dropdownRef}>
  <div className="relative">
    <input
      type="text"
      placeholder="Search jobs..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full pl-4 pr-10 py-2 rounded-lg shadow-md bg-white/80 placeholder-gray-400 
                 focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-[#309689] 
                 transition duration-300 text-sm sm:text-base"
    />
    <button
      type="button"
      onClick={() => fetchJobs(query)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#309689] hover:text-[#26776d]"
    >
      <Search size={18} />
    </button>
  </div>

  {query.trim() && (
    <div className="absolute mt-1 w-full bg-white/95 rounded-lg shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
      {loading && (
        <p className="px-4 py-2 text-gray-500 text-sm animate-pulse">Searching...</p>
      )}

      {!loading && results.length > 0 ? (
        results.map((job) => (
          <Link key={job._id} href={`/job/${job._id}`}>
            <div className="px-4 py-2 hover:bg-[#309689]/10 cursor-pointer transition">
              <p className="font-medium text-gray-800 text-sm sm:text-base">{job.title}</p>
              <p className="text-gray-500 text-xs sm:text-sm">{job.company?.name}</p>
            </div>
          </Link>
        ))
      ) : (
        !loading && (
          <p className="px-4 py-2 text-gray-500 text-sm">No jobs found.</p>
        )
      )}
    </div>
  )}
</div>


  );
};

export default JobSearch;
