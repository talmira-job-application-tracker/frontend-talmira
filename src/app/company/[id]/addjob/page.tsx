"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { JobCreateType } from "@/types/jobType";
import { useDispatch } from "react-redux";
import { addJob } from "@/redux/slices/jobSlice";
import { AppDispatch } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";

export const schema = yup.object({
  title: yup.string().required("Job title is required"),
  description: yup.string().required("Description is required"),
  location: yup.string().required("Location is required"),
  jobType: yup
    .string()
    .oneOf(["Full-time", "Part-time",  "Internship"])
    .required("Job type is required"),
  salary: yup.string().required("Salary is required"),
  language: yup
    .mixed()
    .transform((value) =>
      typeof value === "string"
        ? value
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean)
        : value
    )
    .default([]),
  qualification: yup.string().required("Qualification is required"),
  keyword: yup
    .mixed()
    .transform((value) =>
      typeof value === "string"
        ? value
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean)
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
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JobCreateType>({
    resolver: yupResolver(schema) as any,
  });

 const onSubmit = async (data: JobCreateType) => {
  const jobData = {
    ...data,
    company: companyId as string,
  };
  const result = await dispatch(addJob(jobData));
  
  if (addJob.fulfilled.match(result)) {
    router.push(`/company/${companyId}`);
  }
};




  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Job</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Job Title</label>
          <input
            {...register("title")}
            className="border p-2 w-full"
            placeholder="Enter job title"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <label>Description</label>
          <textarea
            {...register("description")}
            className="border p-2 w-full"
            placeholder="Enter description"
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        <div>
          <label>Location</label>
          <input
            {...register("location")}
            className="border p-2 w-full"
            placeholder="Enter location"
          />
          {errors.location && <p className="text-red-500">{errors.location.message}</p>}
        </div>

        <div>
          <label>Keywords (comma separated)</label>
          <input
            {...register("keyword")}
            className="border p-2 w-full"
            placeholder="Enter keywords (e.g., React, Node, Python)"
          />
          {errors.keyword && <p className="text-red-500">{errors.keyword.message}</p>}
        </div>

        <div>
          <label>Salary</label>
          <input
            {...register("salary")}
            className="border p-2 w-full"
            placeholder="Enter salary range"
          />
          {errors.salary && <p className="text-red-500">{errors.salary.message}</p>}
        </div>

        <div>
          <label>Language (comma separated)</label>
          <input
            {...register("language")}
            className="border p-2 w-full"
            placeholder="Enter languages (optional)"
          />
          {errors.language && <p className="text-red-500">{errors.language.message}</p>}
        </div>

        <div>
          <label>Qualification</label>
          <input
            {...register("qualification")}
            className="border p-2 w-full"
            placeholder="Enter qualification"
          />
          {errors.qualification && <p className="text-red-500">{errors.qualification.message}</p>}
        </div>

        <div>
          <label htmlFor="jobType">Job Type:</label>
          <select id="jobType" {...register("jobType")} className="border p-2 w-full">
            <option value="">Select job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
          {errors.jobType && <p className="text-red-500">{errors.jobType.message}</p>}
        </div>

        <div>
          <label htmlFor="workMode">Work Mode:</label>
          <select id="workMode" {...register("workMode")} className="border p-2 w-full">
            <option value="">Select work mode</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-Site">On-Site</option>
            <option value="Remote">Remote</option>
          </select>
          {errors.workMode && <p className="text-red-500">{errors.workMode.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isSubmitting ? "Submitting..." : "Add Job"}
        </button>
      </form>
    </div>
  );
};

export default AddJob;
