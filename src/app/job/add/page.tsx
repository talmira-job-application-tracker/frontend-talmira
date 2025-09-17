// "use client";

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { JobCreateType } from "@/types/jobType";
// import { CompanyType } from "@/types/companyType";
// import { useDispatch } from "react-redux";
// import { addJob } from "@/redux/slices/jobSlice";
// import { AppDispatch } from "@/redux/store";
// import { useRouter } from "next/navigation";
// import { useState, useEffect, useRef } from "react";
// import { Search, X } from "lucide-react";
// import api from "@/api"; // Import your API instance

// // Company Search Select Component
// const CompanySearchSelect = ({ 
//   onCompanySelect, 
//   selectedCompany 
// }: { 
//   onCompanySelect: (company: CompanyType | null) => void; 
//   selectedCompany: CompanyType | null;
// }) => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<CompanyType[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const fetchCompanies = async (searchQuery: string) => {
//     if (!searchQuery.trim()) {
//       setResults([]);
//       return;
//     }
//     setLoading(true);
//     setError("");

//     try {
//       // Use your existing API instance instead of fetch
//       const response = await api.get(`/company/list?query=${encodeURIComponent(searchQuery)}`);
//       setResults(response.data.data || []);
//     } catch (err: any) {
//       console.error("Error fetching companies:", err);
//       setError(err.response?.data?.message || "Failed to fetch companies");
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (query) {
//         fetchCompanies(query);
//         setIsDropdownOpen(true);
//       } else {
//         setResults([]);
//         setIsDropdownOpen(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [query]);

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSelectCompany = (company: CompanyType) => {
//     onCompanySelect(company);
//     setQuery("");
//     setIsDropdownOpen(false);
//     setResults([]);
//   };

//   const handleClearSelection = () => {
//     onCompanySelect(null);
//     setQuery("");
//   };

//   return (
//     <div className="relative w-full" ref={dropdownRef}>
//       {selectedCompany ? (
//         <div className="flex items-center justify-between p-3 bg-white/20 border border-white/30 rounded-lg">
//           <div className="flex items-center gap-3">
//             {selectedCompany.logo && (
//               <img
//                 src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${selectedCompany.logo}`}
//                 alt={selectedCompany.name}
//                 className="w-8 h-8 rounded-full object-contain border"
//               />
//             )}
//             <span className="font-medium text-[#07332f]">{selectedCompany.name}</span>
//           </div>
//           <button
//             type="button"
//             onClick={handleClearSelection}
//             className="text-red-500 hover:text-red-700"
//           >
//             <X size={18} />
//           </button>
//         </div>
//       ) : (
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search for a company..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="w-full p-3 bg-white/20 text-[#07332f] placeholder-[#07332f]/70 border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none rounded-lg transition"
//           />
//           <button
//             type="button"
//             onClick={() => query && fetchCompanies(query)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-[#309689] hover:text-[#26776d]"
//           >
//             <Search size={18} />
//           </button>
//         </div>
//       )}

//       {isDropdownOpen && query.trim() && (
//         <div className="absolute mt-1 w-full bg-white/95 rounded-lg shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
//           {loading && (
//             <p className="px-4 py-2 text-gray-500 text-sm animate-pulse">Searching...</p>
//           )}

//           {!loading && results.length > 0 ? (
//             results.map((company) => {
//               const logoPath = company.logo?.replace(/\\/g, "/");
//               const logoUrl = logoPath
//                 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${logoPath?.startsWith("/") ? "" : "/"}${logoPath}`
//                 : null;

//               return (
//                 <button
//                   key={company._id}
//                   type="button"
//                   onClick={() => handleSelectCompany(company)}
//                   className="w-full text-left flex items-center gap-3 px-4 py-2 hover:bg-[#309689]/10 cursor-pointer transition"
//                 >
//                   {logoUrl ? (
//                     <img
//                       src={logoUrl}
//                       alt={company.name}
//                       className="w-8 h-8 rounded-full object-contain border"
//                     />
//                   ) : (
//                     <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
//                       N/A
//                     </div>
//                   )}
//                   <p className="font-medium text-gray-800 text-sm sm:text-base">{company.name}</p>
//                 </button>
//               );
//             })
//           ) : (
//             !loading && query && (
//               <p className="px-4 py-2 text-gray-500 text-sm">No companies found.</p>
//             )
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// // Validation Schema
// export const schema = yup.object({
//   title: yup.string().required("Job title is required"),
//   description: yup.string().required("Description is required"),
//   location: yup.string().required("Location is required"),
//   jobType: yup
//     .string()
//     .oneOf(["Full-time", "Part-time", "Internship"])
//     .required("Job type is required"),
//   salary: yup.string().required("Salary is required"),
//   language: yup
//     .mixed()
//     .transform((value) =>
//       typeof value === "string"
//         ? value.split(",").map((v) => v.trim()).filter(Boolean)
//         : value
//     )
//     .default([]),
//   qualification: yup.string().required("Qualification is required"),
//   keyword: yup
//     .mixed()
//     .transform((value) =>
//       typeof value === "string"
//         ? value.split(",").map((v) => v.trim()).filter(Boolean)
//         : value
//     )
//     .test("non-empty", "At least one keyword is required", (val) => {
//       return Array.isArray(val) && val.length > 0;
//     })
//     .required("Keyword is required"),
//   workMode: yup
//     .string()
//     .oneOf(["Hybrid", "On-Site", "Remote"])
//     .required("Work mode is required"),
//   company: yup.string().required("Please select a company"),
// });

// // Main AddJob Component
// const AddJob = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();
//   const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm<JobCreateType>({
//     resolver: yupResolver(schema) as any,
//   });

//   const handleCompanySelect = (company: CompanyType | null) => {
//     setSelectedCompany(company);
//     setValue("company", company?._id || "");
//   };

//   const onSubmit = async (data: JobCreateType) => {
//     try {
//       const result = await dispatch(addJob(data));
//       if (addJob.fulfilled.match(result)) {
//         router.push("/job");
//       }
//     } catch (error) {
//       console.error("Error adding job:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center ">
//       <div className="w-full max-w-2xl p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">
//         <h2 className="text-3xl font-bold text-center text-black mb-8">
//           Add Job
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Company Selection Field */}
//           <div className="flex flex-col">
//             <label className="text-[#07332f] font-semibold mb-2">Company</label>
//             <CompanySearchSelect 
//               onCompanySelect={handleCompanySelect} 
//               selectedCompany={selectedCompany} 
//             />
//             <input type="hidden" {...register("company")} />
//             {errors.company && <p className="text-red-400 mt-1">{errors.company.message}</p>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-[#07332f] font-semibold mb-2">Job Title</label>      
//             <input
//               {...register("title")}
//               placeholder="Enter job title"
//               className="w-full p-3 bg-white/20 text-[#07332f] placeholder-[#07332f]/70 border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none rounded-lg transition"
//             />
//             {errors.title && <p className="text-red-400 mt-1">{errors.title.message}</p>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-[#07332f] font-semibold mb-2">Description</label>
//             <textarea
//               {...register("description")}
//               placeholder="Enter description"
//               rows={4}
//               className="w-full p-3 bg-white/20 text-[#07332f] placeholder-[#07332f]/70 border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none resize-none rounded-lg transition"
//             />
//             {errors.description && <p className="text-red-400 mt-1">{errors.description.message}</p>}
//           </div>

//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 flex flex-col">
//               <label className="text-[#07332f] font-semibold mb-2">Location</label>
//               <input
//                 {...register("location")}
//                 placeholder="Enter location"
//                 className="w-full p-3 bg-white/20 text-[#07332f] placeholder-[#07332f]/70 border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none rounded-lg transition"
//               />
//               {errors.location && <p className="text-red-400 mt-1">{errors.location.message}</p>}
//             </div>

//             <div className="flex-1 flex flex-col">
//               <label className="text-[#07332f] font-semibold mb-2">Salary</label>
//               <input
//                 {...register("salary")}
//                 placeholder="Enter salary range"
//                 className="w-full p-3 bg-white/20 text-[#07332f] placeholder-[#07332f]/70 border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none rounded-lg transition"
//               />
//               {errors.salary && <p className="text-red-400 mt-1">{errors.salary.message}</p>}
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 flex flex-col">
//               <label className="text-[#07332f] font-semibold mb-2">Keywords</label>
//               <input
//                 {...register("keyword")}
//                 placeholder="Keywords match with job"
//                 className="w-full p-3 bg-white/20 text-[#07332f] placeholder-[#07332f]/70 border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none rounded-lg transition"
//               />
//               {errors.keyword && <p className="text-red-400 mt-1">{errors.keyword.message}</p>}
//             </div>

//             <div className="flex-1 flex flex-col">
//               <label className="text-[#07332f] font-semibold mb-2">Language</label>
//               <input
//                 {...register("language")}
//                 placeholder="English, Hindi"
//                 className="w-full p-3 bg-white/20 text-[#07332f] placeholder-[#07332f]/70 border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none rounded-lg transition"
//               />
//             </div>
//           </div>

//           <div className="flex flex-col">
//             <label className="text-[#07332f] font-semibold mb-2">Qualification</label>
//             <input
//               {...register("qualification")}
//               placeholder="Enter qualification"
//               className="w-full p-3 bg-white/20 text-[#07332f] placeholder-[#07332f]/70 border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none rounded-lg transition"
//             />
//             {errors.qualification && <p className="text-red-400 mt-1">{errors.qualification.message}</p>}
//           </div>

//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 flex flex-col">
//               <label className="text-[#07332f] font-semibold mb-2">Job Type</label>
//               <select
//                 {...register("jobType")}
//                 className="w-full p-3 bg-white/20 text-[#07332f] border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none appearance-none rounded-lg transition"
//               >
//                 <option value="">Select job type</option>
//                 <option value="Full-time">Full-time</option>
//                 <option value="Part-time">Part-time</option>
//                 <option value="Internship">Internship</option>
//               </select>
//               {errors.jobType && <p className="text-red-400 mt-1">{errors.jobType.message}</p>}
//             </div>

//             <div className="flex-1 flex flex-col">
//               <label className="text-[#07332f] font-semibold mb-2">Work Mode</label>
//               <select
//                 {...register("workMode")}
//                 className="w-full p-3 bg-white/20 text-[#07332f] border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none rounded-lg transition"
//               >
//                 <option value="">Select work mode</option>
//                 <option value="Hybrid">Hybrid</option>
//                 <option value="On-Site">On-Site</option>
//                 <option value="Remote">Remote</option>
//               </select>
//               {errors.workMode && <p className="text-red-400 mt-1">{errors.workMode.message}</p>}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-[#309689] hover:bg-[#267a6e] text-white font-bold py-3 rounded-lg shadow-lg transition"
//           >
//             {isSubmitting ? "Submitting..." : "Add Job"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddJob;


"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { JobCreateType } from "@/types/jobType";
import { CompanyType } from "@/types/companyType";
import { useDispatch } from "react-redux";
import { addJob } from "@/redux/slices/jobSlice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Autocomplete from "react-google-autocomplete";
import { Search, X } from "lucide-react";
import api from "@/api";

// Company Search Select Component
const CompanySearchSelect = ({ 
  onCompanySelect, 
  selectedCompany 
}: { 
  onCompanySelect: (company: CompanyType | null) => void; 
  selectedCompany: CompanyType | null;
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CompanyType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchCompanies = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError("");

    try {
      // Use your existing API instance instead of fetch
      const response = await api.get(`/company/list?query=${encodeURIComponent(searchQuery)}`);
      setResults(response.data.data || []);
    } catch (err: any) {
      console.error("Error fetching companies:", err);
      setError(err.response?.data?.message || "Failed to fetch companies");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        fetchCompanies(query);
        setIsDropdownOpen(true);
      } else {
        setResults([]);
        setIsDropdownOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCompany = (company: CompanyType) => {
    onCompanySelect(company);
    setQuery("");
    setIsDropdownOpen(false);
    setResults([]);
  };

  const handleClearSelection = () => {
    onCompanySelect(null);
    setQuery("");
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {selectedCompany ? (
        <div className="flex items-center justify-between p-3 bg-white/20 border border-white/30 rounded-lg">
          <div className="flex items-center gap-3">
            {selectedCompany.logo && (
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${selectedCompany.logo}`}
                alt={selectedCompany.name}
                className="w-8 h-8 rounded-full object-contain border"
              />
            )}
            <span className="font-medium text-[#07332f]">{selectedCompany.name}</span>
          </div>
          <button
            type="button"
            onClick={handleClearSelection}
            className="text-red-500 hover:text-red-700"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a company..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 bg-white/20 text-[#07332f] placeholder-[#07332f]/70 border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none rounded-lg transition"
          />
          <button
            type="button"
            onClick={() => query && fetchCompanies(query)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#309689] hover:text-[#26776d]"
          >
            <Search size={18} />
          </button>
        </div>
      )}

      {isDropdownOpen && query.trim() && (
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
                <button
                  key={company._id}
                  type="button"
                  onClick={() => handleSelectCompany(company)}
                  className="w-full text-left flex items-center gap-3 px-4 py-2 hover:bg-[#309689]/10 cursor-pointer transition"
                >
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
                </button>
              );
            })
          ) : (
            !loading && query && (
              <p className="px-4 py-2 text-gray-500 text-sm">No companies found.</p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export const schema = yup.object({
  title: yup.string().required("Job title is required"),
  description: yup.string().required("Description is required"),
  location: yup.string().required("Location is required"),
  jobType: yup
    .string()
    .oneOf(["Full-time", "Part-time", "Internship"])
    .required("Job type is required"),
  salary: yup.string().required("Salary is required"),
  language: yup
    .mixed()
    .transform((value) =>
      typeof value === "string"
        ? value.split(",").map((v) => v.trim()).filter(Boolean)
        : value
    )
    .default([]),
  qualification: yup.string().required("Qualification is required"),
  keyword: yup
    .mixed()
    .transform((value) =>
      typeof value === "string"
        ? value.split(",").map((v) => v.trim()).filter(Boolean)
        : value
    )
    .test("non-empty", "At least one keyword is required", (val) => {
      return Array.isArray(val) && val.length > 0;
    })
    .required("Keyword is required"),
  workMode: yup
    .string()
    .oneOf(["Hybrid", "On-Site", "Remote"])
    .required("Work mode is required"),
  company: yup.string().required("Please select a company"),
});

const AddJob = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<JobCreateType>({
    resolver: yupResolver(schema) as any,
  });

  const handleCompanySelect = (company: CompanyType | null) => {
    setSelectedCompany(company);
    setValue("company", company?._id || "");
  };

  const onSubmit = async (data: JobCreateType) => {
    try {
      const result = await dispatch(addJob(data));
      if (addJob.fulfilled.match(result)) {
        router.push("/admin/dashboard?tab=jobs");
      }
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-black mb-8">Add Job</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Selection */}
          <div className="flex flex-col">
            <label className="text-[#07332f] font-semibold mb-2">Company</label>
            <CompanySearchSelect 
              onCompanySelect={handleCompanySelect} 
              selectedCompany={selectedCompany} 
            />
            <input type="hidden" {...register("company")} />
            {errors.company && <p className="text-red-400 mt-1">{errors.company.message}</p>}
          </div>

          {/* Job Title */}
          <div className="flex flex-col">
            <label className="text-[#07332f] font-semibold mb-2">Job Title</label>
            <input
              {...register("title")}
              placeholder="Enter job title"
              className="w-full p-3 bg-white/20 text-[#07332f] placeholder-[#07332f]/70 border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none rounded-lg transition"
            />
            {errors.title && <p className="text-red-400 mt-1">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-[#07332f] font-semibold mb-2">Description</label>
            <textarea
              {...register("description")}
              placeholder="Enter description"
              rows={4}
              className="w-full p-3 bg-white/20 text-[#07332f] placeholder-[#07332f]/70 border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none resize-none rounded-lg transition"
            />
            {errors.description && <p className="text-red-400 mt-1">{errors.description.message}</p>}
          </div>

          {/* Location & Salary */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col">
              <label className="text-[#07332f] font-semibold mb-2">Location</label>
              <Controller
                name="location"
                control={control}
                rules={{ required: "Location is required" }}
                render={({ field }) => (
                  <Autocomplete
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
                    onPlaceSelected={(place) => field.onChange(place.formatted_address || "")}
                    types={["(cities)"]}
                    placeholder="Job location"
                    className="w-full pl-4 pr-4 py-2 rounded-lg shadow-md bg-white/80 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#309689] focus:border-[#309689] transition duration-300 text-sm sm:text-base"
                  />
                )}
              />
              {errors.location && <p className="text-red-400 mt-1">{errors.location.message}</p>}
            </div>

            <div className="flex-1 flex flex-col">
              <label className="text-[#07332f] font-semibold mb-2">Salary</label>
              <input
                {...register("salary")}
                placeholder="Enter salary range"
                className="w-full p-3 bg-white/20 text-[#07332f] placeholder-[#07332f]/70 border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none rounded-lg transition"
              />
              {errors.salary && <p className="text-red-400 mt-1">{errors.salary.message}</p>}
            </div>
          </div>

          {/* Keywords & Language */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col">
              <label className="text-[#07332f] font-semibold mb-2">Keywords</label>
              <input
                {...register("keyword")}
                placeholder="Keywords match with job"
                className="w-full p-3 bg-white/20 text-[#07332f] placeholder-[#07332f]/70 border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none rounded-lg transition"
              />
              {errors.keyword && <p className="text-red-400 mt-1">{errors.keyword.message}</p>}
            </div>

            <div className="flex-1 flex flex-col">
              <label className="text-[#07332f] font-semibold mb-2">Language</label>
              <input
                {...register("language")}
                placeholder="English, Hindi"
                className="w-full p-3 bg-white/20 text-[#07332f] placeholder-[#07332f]/70 border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none rounded-lg transition"
              />
            </div>
          </div>

          {/* Qualification */}
          <div className="flex flex-col">
            <label className="text-[#07332f] font-semibold mb-2">Qualification</label>
            <input
              {...register("qualification")}
              placeholder="Enter qualification"
              className="w-full p-3 bg-white/20 text-[#07332f] placeholder-[#07332f]/70 border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none rounded-lg transition"
            />
            {errors.qualification && <p className="text-red-400 mt-1">{errors.qualification.message}</p>}
          </div>

          {/* Job Type & Work Mode */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col">
              <label className="text-[#07332f] font-semibold mb-2">Job Type</label>
              <select
                {...register("jobType")}
                className="w-full p-3 bg-white/20 text-[#07332f] border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none appearance-none rounded-lg transition"
              >
                <option value="">Select job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
              {errors.jobType && <p className="text-red-400 mt-1">{errors.jobType.message}</p>}
            </div>

            <div className="flex-1 flex flex-col">
              <label className="text-[#07332f] font-semibold mb-2">Work Mode</label>
              <select
                {...register("workMode")}
                className="w-full p-3 bg-white/20 text-[#07332f] border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none rounded-lg transition"
              >
                <option value="">Select work mode</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-Site">On-Site</option>
                <option value="Remote">Remote</option>
              </select>
              {errors.workMode && <p className="text-red-400 mt-1">{errors.workMode.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#309689] hover:bg-[#267a6e] text-white font-bold py-3 rounded-lg shadow-lg transition"
          >
            {isSubmitting ? "Submitting..." : "Add Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
