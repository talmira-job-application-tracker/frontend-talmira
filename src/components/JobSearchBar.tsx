"use client";

import api from "@/api";
import { JobType } from "@/types/jobType";
import { useState } from "react";

export default function JobSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<JobType[]>([]);

  const handleSearch = async () => {
    try {
      const res = await api.get(`/job/list?query=${query}`);
      setResults(res.data.data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search jobs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 m-1 w-80"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
      >
        Search
      </button>

      <div className="mt-4">
        {results.map((job) => (
          <div key={job._id} className="border p-3 mb-2 rounded">
            <h3 className="font-bold">{job.title}</h3>
            <p>{job.company?.name}</p>
            <p>
              {job.location} | {job.jobType} | {job.workMode}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import api from "@/api";

// export default function JobSearch() {
//   const [filters, setFilters] = useState({
//     title: "",
//     location: "",
//     jobType: "",
//     workMode: "",
//     keyword: "",
//   });

//   const [results, setResults] = useState([]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const handleSearch = async () => {
//     const params = new URLSearchParams();

//     Object.entries(filters).forEach(([key, value]) => {
//       if (value) params.append(key, value);
//     });

//     const res = await api.get(`/job/list?${params.toString()}`);
//     setResults(res.data.data);
//   };

//   return (
//     <div>
//       <input name="title" placeholder="Job Title" value={filters.title} onChange={handleChange} />
//       <input name="location" placeholder="Location" value={filters.location} onChange={handleChange} />

//       <select name="jobType" value={filters.jobType} onChange={handleChange}>
//         <option value="">Select Job Type</option>
//         <option value="Full-time">Full-time</option>
//         <option value="Part-time">Part-time</option>
//         <option value="Contract">Contract</option>
//         <option value="Internship">Internship</option>
//       </select>

//       <select name="workMode" value={filters.workMode} onChange={handleChange}>
//         <option value="">Select Work Mode</option>
//         <option value="On-Site">On-Site</option>
//         <option value="Remote">Remote</option>
//         <option value="Hybrid">Hybrid</option>
//       </select>

//       <button onClick={handleSearch}>Search</button>

//       <div>
//         {results.map((job: any) => (
//           <div key={job._id}>
//             <h3>{job.title}</h3>
//             <p>{job.location} | {job.jobType} | {job.workMode}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
