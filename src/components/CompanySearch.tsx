// "use client"

// import api from "@/api"
// import { CompanyType } from "@/types/companyType"
// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { FiSearch } from "react-icons/fi"
// import { Loader2 } from "lucide-react"

// const CompanySearch = () => {
//   const [query, setQuery] = useState("")
//   const [results, setResults] = useState<CompanyType[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   const fetchCompanies = async (searchQuery: string) => {
//     if (!searchQuery.trim()) {
//       setResults([])
//       return
//     }

//     setLoading(true)
//     setError("")

//     try {
//       const res = await api.get(`/company/list?query=${encodeURIComponent(searchQuery)}`)
//       setResults(res.data.data || [])
//     } catch (err: any) {
//       console.error("Error fetching companies:", err)
//       setError(err.response?.data?.message || "Failed to fetch companies")
//       setResults([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   // debounce
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (query) {
//         fetchCompanies(query)
//       } else {
//         setResults([])
//       }
//     }, 500)
//     return () => clearTimeout(timer)
//   }, [query])

//   return (
//     <div className="p-6 space-y-6">
//       {/* Search Input */}
//       <div className="relative w-full max-w-xl mx-auto">
//         <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//         <input
//           type="text"
//           placeholder="Search companies..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="w-full pl-12 pr-12 py-3 rounded-2xl border border-gray-300 bg-white/60 
//                      backdrop-blur-md shadow-sm focus:outline-none font-medium text-gray-800 placeholder-gray-400"
//         />
//         {loading && (
//           <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-indigo-500" size={20} />
//         )}
//       </div>

//       {/* Error */}
//       {error && <p className="text-red-600 font-medium text-center">{error}</p>}

//       {/* Results */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {results.length > 0 ? (
//           results.map((company) => {
//             const logoPath = company.logo?.replace(/\\/g, "/")
//             const logoUrl = logoPath
//               ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${logoPath?.startsWith("/") ? "" : "/"}${logoPath}`
//               : null

//             return (
//               <Link key={company._id} href={`/company/${company._id}`}>
//                 <div className="group backdrop-blur-md bg-white/30 border border-white/20 
//                                 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] 
//                                 transition-all p-6 cursor-pointer flex flex-col items-center gap-4">
                  
//                   {/* Logo */}
//                   {logoUrl ? (
//                     <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
//                       <img
//                         src={logoUrl}
//                         alt={company.name}
//                         className="object-contain w-full h-full"
//                       />
//                     </div>
//                   ) : (
//                     <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
//                       No Logo
//                     </div>
//                   )}

//                   {/* Name */}
//                   <h3 className="font-semibold text-lg text-gray-800 group-hover:text-indigo-600 text-center">
//                     {company.name}
//                   </h3>
//                 </div>
//               </Link>
//             )
//           })
//         ) : (
//           query.trim() &&
//           !loading && (
//             <p className="text-gray-500 text-center col-span-full">No companies found.</p>
//           )
//         )}
//       </div>
//     </div>
//   )
// }

// export default CompanySearch

"use client";

import api from "@/api";
import { CompanyType } from "@/types/companyType";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const CompanySearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CompanyType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchCompanies = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError("");

    api
      .get(`/company/list?query=${encodeURIComponent(searchQuery)}`)
      .then((res) => setResults(res.data.data || []))
      .catch((err) => {
        console.error("Error fetching companies:", err);
        setError(err.response?.data?.message || "Failed to fetch companies");
        setResults([]);
      })
      .finally(() => setLoading(false));
  };

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) fetchCompanies(query);
      else setResults([]);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // close dropdown on outside click
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
          placeholder="Search companies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-4 pr-10 py-2 rounded-lg shadow-md bg-white/80 placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-[#309689] 
                     transition duration-300 text-sm sm:text-base"
        />
        <button
          type="button"
          onClick={() => fetchCompanies(query)}
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
            results.map((company) => {
              const logoPath = company.logo?.replace(/\\/g, "/");
              const logoUrl = logoPath
                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${logoPath?.startsWith("/") ? "" : "/"}${logoPath}`
                : null;

              return (
                <Link key={company._id} href={`/company/${company._id}`}>
                  <div className="flex items-center gap-3 px-4 py-2 hover:bg-[#309689]/10 cursor-pointer transition">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={company.name}
                        className="w-8 h-8 rounded-full object-contain border"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                        N/A
                      </div>
                    )}
                    <p className="font-medium text-gray-800 text-sm sm:text-base">{company.name}</p>
                  </div>
                </Link>
              );
            })
          ) : (
            !loading && (
              <p className="px-4 py-2 text-gray-500 text-sm">No companies found.</p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default CompanySearch;
