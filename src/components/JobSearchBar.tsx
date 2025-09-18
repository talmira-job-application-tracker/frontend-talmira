"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { listJobs } from "@/redux/slices/jobSlice";
import Autocomplete from "react-google-autocomplete";

const JobSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [locationInput, setLocationInput] = useState(""); 
  const [workMode, setWorkMode] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    dispatch(
      listJobs({
        page: 1,
        limit: 10,
        append: false,
        query: query.trim() || undefined,
        location: location.trim() || undefined,
        workMode: workMode || undefined,
      })
    );
    setShowDropdown(false);
  };

  // Debounce search for keyword
  useEffect(() => {
    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(() => {
      handleSearch();
    }, 300);
    setTypingTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [query, location, workMode]);

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-6" ref={dropdownRef}>
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Keyword input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search jobs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            className="w-full pl-4 pr-10 py-2 rounded-lg shadow-md bg-white/80 placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-[#309689] 
                       transition duration-300 text-sm sm:text-base"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#309689] hover:text-[#26776d]"
          >
            <Search size={18} />
          </button>
        </div>

        {/* Location input with Google Autocomplete + Clear Button */}
        <div className="relative w-full sm:w-64">
          <Autocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
            onPlaceSelected={(place) => {
              const loc = place.formatted_address || "";
              setLocation(loc);
              setLocationInput(loc);  
            }}
            types={["(cities)"]}
            placeholder="Location"
            value={locationInput}
            onChange={(e) => {
              const val = (e.target as HTMLInputElement).value;
              setLocationInput(val);
              setLocation(val || "");    
            }}
            className="w-full pl-4 pr-10 py-2 rounded-lg shadow-md bg-white/80 placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-[#309689] 
                       transition duration-300 text-sm sm:text-base"
          />
          {locationInput && (
            <button
              type="button"
              onClick={() => {
                setLocationInput("");
                setLocation("");
                handleSearch();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Work Mode Filter */}
        <select
          value={workMode}
          onChange={(e) => setWorkMode(e.target.value)}
          className="w-full sm:w-40 pl-3 pr-3 py-2 rounded-lg shadow-md bg-white/80 text-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-[#309689] transition duration-300 text-sm sm:text-base"
        >
          <option value="">All</option>
          <option value="Remote">Remote</option>
          <option value="On-Site">On-Site</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      {/* Optional dropdown for suggestions */}
      {showDropdown && (
        <div className="absolute mt-1 w-full bg-white/95 rounded-lg shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
          <p className="px-4 py-2 text-gray-500 text-sm">Searching...</p>
        </div>
      )}
    </div>
  );
};

export default JobSearch;

