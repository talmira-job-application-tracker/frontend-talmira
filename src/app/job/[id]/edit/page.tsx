"use client";

import { AppDispatch, RootState } from "@/redux/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as yup from "yup";
import { editJob, viewJob } from "@/redux/slices/jobSlice";
import toast from "react-hot-toast";

export interface JobEditType {
  title: string;
  description: string;
  location: string;
  jobType: "Full-time" | "Part-time" | "Internship";
  salary: string;
  language: string | string[];
  qualification: string;
  keyword: string | string[];
  workMode: "Hybrid" | "On-Site" | "Remote";
}

const schema = yup.object().shape({
  title: yup.string().required("Job title is required"),
  description: yup.string().required("Job description is required"),
  location: yup.string().required("Location is required"),
  jobType: yup.string().required("Job type is required"),
  salary: yup.string().required("Salary is required"),
  language: yup.string().optional(),
  qualification: yup.string().required("Qualification is required"),
  keyword: yup.string().required("Keyword is required"),
  workMode: yup.string().required("Work mode is required"),
});

const EditJob = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id?.toString();

  const dispatch = useDispatch<AppDispatch>();
  const { job, loading } = useSelector((state: RootState) => state.job);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobEditType>({
    resolver: yupResolver(schema) as any,
  });

  useEffect(() => {
    if (id) dispatch(viewJob(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (job) {
      reset({
        title: job.title,
        description: job.description,
        location: job.location,
        jobType: job.jobType,
        salary: job.salary,
        qualification: job.qualification,
        workMode: job.workMode,
        language: job.language?.join(", "),
        keyword: job.keyword?.join(", "),
      } as any);
    }
  }, [job, reset]);

  const onSubmit = (data: any) => {
    const jobData: JobEditType = {
      title: data.title,
      description: data.description,
      location: data.location,
      jobType: data.jobType,
      salary: data.salary,
      qualification: data.qualification,
      workMode: data.workMode,
      language: data.language
        ? data.language.split(",").map((l: string) => l.trim())
        : [],
      keyword: data.keyword
        ? data.keyword.split(",").map((k: string) => k.trim())
        : [],
    };

    if (!id) {
      toast.error("Job ID not found");
      return;
    }

    dispatch(editJob({ id, jobData }))
      .unwrap()
      .then(() => {
        toast.success("Job updated successfully");
        router.push(`/job/${id}`);
      })
      .catch(() => toast.error("Failed to update job"));
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-teal-900 to-black px-4 overflow-hidden">
      {/* decorative blurred shapes */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal-500/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full mix-blend-overlay filter blur-2xl animate-[pulse_6s_ease-in-out_infinite]" />

      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10 relative z-10">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8 tracking-wide drop-shadow-lg">
          Edit Job Details
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-teal-200 mb-2 tracking-wide">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              placeholder="Job title"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none backdrop-blur-md transition-all duration-300 hover:bg-white/20"
            />
            <p className="text-red-400 text-xs mt-1">{errors.title?.message}</p>
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-teal-200 mb-2 tracking-wide">
              Location
            </label>
            <input
              type="text"
              {...register("location")}
              placeholder="Job location"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none backdrop-blur-md transition-all duration-300 hover:bg-white/20"
            />
            <p className="text-red-400 text-xs mt-1">{errors.location?.message}</p>
          </div>

          {/* Job Type */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-teal-200 mb-2 tracking-wide">
              Job Type
            </label>
            <select
              {...register("jobType")}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-teal-400 focus:outline-none backdrop-blur-md transition-all duration-300 hover:bg-white/20"
            >
              <option value="" className="text-black">Select Job Type</option>
              <option value="Full-time" className="text-black">Full-time</option>
              <option value="Part-time" className="text-black">Part-time</option>
              <option value="Internship" className="text-black">Internship</option>
            </select>
            <p className="text-red-400 text-xs mt-1">{errors.jobType?.message}</p>
          </div>

          {/* Salary */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-teal-200 mb-2 tracking-wide">
              Salary
            </label>
            <input
              type="text"
              {...register("salary")}
              placeholder="Job salary"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none backdrop-blur-md transition-all duration-300 hover:bg-white/20"
            />
            <p className="text-red-400 text-xs mt-1">{errors.salary?.message}</p>
          </div>

          {/* Languages */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-teal-200 mb-2 tracking-wide">
              Languages
            </label>
            <input
              type="text"
              {...register("language")}
              placeholder="e.g. JavaScript, Python"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none backdrop-blur-md transition-all duration-300 hover:bg-white/20"
            />
            <p className="text-red-400 text-xs mt-1">{errors.language?.message}</p>
          </div>

          {/* Qualification */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-teal-200 mb-2 tracking-wide">
              Qualification
            </label>
            <input
              type="text"
              {...register("qualification")}
              placeholder="Job qualification"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none backdrop-blur-md transition-all duration-300 hover:bg-white/20"
            />
            <p className="text-red-400 text-xs mt-1">{errors.qualification?.message}</p>
          </div>

          {/* Keywords */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-teal-200 mb-2 tracking-wide">
              Keywords
            </label>
            <input
              type="text"
              {...register("keyword")}
              placeholder="e.g. frontend, backend"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none backdrop-blur-md transition-all duration-300 hover:bg-white/20"
            />
            <p className="text-red-400 text-xs mt-1">{errors.keyword?.message}</p>
          </div>

          {/* Work Mode */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-teal-200 mb-2 tracking-wide">
              Work Mode
            </label>
            <select
              {...register("workMode")}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-teal-400 focus:outline-none backdrop-blur-md transition-all duration-300 hover:bg-white/20"
            >
              <option value="" className="text-black">Select Work Mode</option>
              <option value="On-Site" className="text-black">On-Site</option>
              <option value="Hybrid" className="text-black">Hybrid</option>
              <option value="Remote" className="text-black">Remote</option>
            </select>
            <p className="text-red-400 text-xs mt-1">{errors.workMode?.message}</p>
          </div>

          {/* Description */}
          <div className="col-span-1 md:col-span-2">
            <label className="text-sm font-semibold text-teal-200 mb-2 block tracking-wide">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Job description"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-transparent focus:outline-none backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              rows={5}
            />
            <p className="text-red-400 text-xs mt-1">
              {errors.description?.message}
            </p>
          </div>

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-bold py-3 rounded-xl shadow-lg backdrop-blur-md transition duration-300 tracking-wide"
            >
              {loading ? "Updating..." : "Update Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
