"use client";

import { AppDispatch } from "@/redux/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as yup from "yup";
import { editJob, viewJob } from "@/redux/slices/jobSlice";
import toast from "react-hot-toast";
import { RootState } from "@/redux/store";

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

  // Fetch job on mount
  useEffect(() => {
    if (id) dispatch(viewJob(id));
  }, [id, dispatch]);

  // Reset form when job is loaded
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
  }

    if (!id) {
        toast.error("Job ID not found");
        return;
    }

    dispatch(editJob({ id, jobData }))
      .unwrap()
      .then(() => {
        toast.success("Job updated successfully");
        router.push("/");
      })
      .catch(() => toast.error("Failed to update job"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input type="text" placeholder="Job title" {...register("title")} />
        <p>{errors.title?.message}</p>

        <label>Description</label>
        <textarea placeholder="Job description" {...register("description")} />
        <p>{errors.description?.message}</p>

        <label>Location</label>
        <input type="text" placeholder="Job location" {...register("location")} />
        <p>{errors.location?.message}</p>

        <label>Job Type</label>
        <input type="text" placeholder="Job type" {...register("jobType")} />
        <p>{errors.jobType?.message}</p>

        <label>Salary</label>
        <input type="text" placeholder="Job salary" {...register("salary")} />
        <p>{errors.salary?.message}</p>

        <label>Languages (comma separated)</label>
        <input type="text" placeholder="e.g. JavaScript, Python" {...register("language")} />
        <p>{errors.language?.message}</p>

        <label>Qualification</label>
        <input type="text" placeholder="Job qualification" {...register("qualification")} />
        <p>{errors.qualification?.message}</p>

        <label>Keywords </label>
        <input type="text" placeholder="e.g. frontend, backend" {...register("keyword")} />
        <p>{errors.keyword?.message}</p>

        <label>Work Mode</label>
        <input type="text" placeholder="e.g. Remote / Onsite" {...register("workMode")} />
        <p>{errors.workMode?.message}</p>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#5a4322] hover:bg-[#7d6240] text-white font-semibold py-2.5 rounded-md transition duration-300 tracking-wide"
        >
          {loading ? "Updating..." : "Update Job"}
        </button>
      </form>
    </div>
  );
};

export default EditJob;
