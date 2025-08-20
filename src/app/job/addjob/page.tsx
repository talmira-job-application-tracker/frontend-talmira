"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { JobCreateType } from "@/types/jobType";

import { useDispatch } from "react-redux";
import { addJob } from "@/redux/slices/jobSlice";
import { AppDispatch } from "@/redux/store";
import { useParams } from "next/navigation";

export const schema = yup.object({
  title: yup.string().required("Job title is required"),
  description: yup.string().required("Description is required"),
  // ❌ no need for company validation here
  location: yup.string().required("Location is required"),
  jobType: yup
    .string()
    .oneOf(["Full-time", "Part-time", "Contract", "Internship"])
    .required("Job type is required"),
  salary: yup.string().required("Salary is required"),
  language: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one language is required"),
  qualification: yup.string().required("Qualification is required"),
  keyword: yup.array().of(yup.string()).nullable(),
  workMode: yup
    .string()
    .oneOf(["Hybrid", "On-Site", "Remote"])
    .required("Work mode is required"),
});

const AddJob = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id: companyId } = useParams();

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<JobCreateType>({
      resolver: yupResolver(schema) as any,
    });

  const onSubmit = async (data: JobCreateType) => {
    const jobData = { ...data, company: companyId as string };
    await dispatch(addJob(jobData));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Add Job</h2>
      
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
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* ❌ Removed company field — we take it from params */}

        <div>
          <label>Location</label>
          <input
            {...register("location")}
            className="border p-2 w-full"
            placeholder="Enter location"
          />
          {errors.location && <p className="text-red-500">{errors.location.message}</p>}
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
