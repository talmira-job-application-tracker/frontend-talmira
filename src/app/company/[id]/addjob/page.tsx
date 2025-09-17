// "use client";

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { JobCreateType } from "@/types/jobType";
// import { useDispatch } from "react-redux";
// import { addJob } from "@/redux/slices/jobSlice";
// import { AppDispatch } from "@/redux/store";
// import { useParams, useRouter } from "next/navigation";

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
// });

// const AddJob = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { id: companyId } = useParams();
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<JobCreateType>({
//     resolver: yupResolver(schema) as any,
//   });

//   const onSubmit = async (data: JobCreateType) => {
//     const jobData = { ...data, company: companyId as string };
//     const result = await dispatch(addJob(jobData));
//     if (addJob.fulfilled.match(result)) {
//       router.push("/admin/dashboard?tab=jobs");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">
//         <h2 className="text-3xl font-bold text-center text-black  mb-8">
//           Add Job
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className="flex flex-col">
//           <label className="text-[#07332f] font-semibold mb-2">Job Title</label>      
//           <input
//             {...register("title")}
//             placeholder="Enter job title"
//             className="w-full p-3 bg-white/20 text-[#07332f] placeholder-[#07332f]/70 border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none rounded-lg transition"
//           />
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
//               <label className="text-[#07332f]font-semibold mb-2">Salary</label>
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
import { useDispatch } from "react-redux";
import { addJob } from "@/redux/slices/jobSlice";
import { AppDispatch } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import Autocomplete from "react-google-autocomplete";

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
});

const AddJob = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id: companyId } = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control, // ✅ add this
    formState: { errors, isSubmitting },
  } = useForm<JobCreateType>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit = async (data: JobCreateType) => {
    const jobData = { ...data, company: companyId as string };
    const result = await dispatch(addJob(jobData));
    if (addJob.fulfilled.match(result)) {
      router.push("/admin/dashboard?tab=jobs");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-black mb-8">Add Job</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
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
