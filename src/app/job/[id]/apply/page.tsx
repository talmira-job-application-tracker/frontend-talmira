"use client";

import api from "@/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup.string().email("Invalid email format"),
  phone: yup.string().required("Please enter your number"),
  resume: yup
    .mixed()
    .required("Please upload your resume")
    .test("fileSize", "File too large", (value: any) => {
      return value && value[0] && value[0].size <= 2 * 1024 * 1024;
    }),
});

type FormData = {
  name: string;
  email: string;
  phone: string;
  resume: FileList;
};

const AddApplication = () => {
  const { id } = useParams(); // jobId
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("jobId", id as string);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("resume", data.resume[0]);

      const res = await api.post(`/application/${id}/apply`, formData);

      toast.success(res.data.message || "Application submitted!");
      reset();
      router.push("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0d1f1e] to-[#103c37] px-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Apply for this Job
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="w-full p-3 rounded-full bg-white/20 text-white placeholder-gray-300 
                         border border-white/30 focus:ring-2 focus:ring-teal-400 outline-none"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-3 rounded-full bg-white/20 text-white placeholder-gray-300 
                         border border-white/30 focus:ring-2 focus:ring-teal-400 outline-none"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone")}
              className="w-full p-3 rounded-full bg-white/20 text-white placeholder-gray-300 
                         border border-white/30 focus:ring-2 focus:ring-teal-400 outline-none"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Resume */}
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-1">
              Upload Resume (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              {...register("resume")}
              className="w-full p-2 rounded-xl bg-white/20 text-gray-200 file:bg-teal-600 file:text-white 
                         file:rounded-lg file:px-4 file:py-2 file:border-0 file:mr-3
                         border border-white/30 focus:ring-2 focus:ring-teal-400 outline-none"
            />
            {errors.resume && (
              <p className="text-red-400 text-sm mt-1">{errors.resume.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-full bg-teal-600 text-white font-semibold 
                       hover:bg-teal-700 active:scale-95 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddApplication;
