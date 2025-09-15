"use client";

import api from "@/api";
import { viewUserById } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Cookies from "js-cookie";

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup.string().email("Invalid email format"),
  phone: yup.string().required("Please enter your number"),
  resume: yup
    .mixed()
    .test("required", "Please upload your resume", (value) => {
      const fileList = value as FileList | undefined;
      return fileList && fileList.length > 0;
    })
    .test("fileSize", "File too large", (value) => {
      const fileList = value as FileList | undefined;
      if (!fileList || fileList.length === 0) return true; 
      return fileList[0].size <= 2 * 1024 * 1024; // 2MB
    }),
});




type FormData = {
  name: string;
  email: string;
  phone: string;
  prevPosition?: string;
  prevCompany?: string;
  resume: FileList;
};

const AddApplication = () => {
  const { id } = useParams(); // jobId
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });

  useEffect(() => {
    const cookieUser = Cookies.get("user");
    if (!cookieUser) return;
    const parsed = JSON.parse(cookieUser);
    const userId = parsed?._id || parsed?.id;
    if (!userId) return;

    dispatch(viewUserById(userId)).then((res: any) => {
      const userData = res?.payload;
      if (userData && Object.keys(userData).length > 0) {
        reset({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          prevPosition: "",
          prevCompany: "",
        });
      }
    });
  }, [dispatch, reset]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("jobId", id as string);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);

      if (data.prevPosition) formData.append("prevPosition", data.prevPosition);
      if (data.prevCompany) formData.append("prevCompany", data.prevCompany);

      formData.append("resume", data.resume[0]);

      const res = await api.post(`/application/${id}/apply`, formData);

      toast.success(res.data.message || "Application submitted!");
      reset({
        name: data.name, 
        email: data.email,
        phone: data.phone,
        prevPosition: "",
        prevCompany: "",
        resume: undefined as any,
      });
      router.push("/application");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0d1f1e] to-[#103c37] py-30 px-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Apply for this Job
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="w-full p-3 rounded-full bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-teal-400 outline-none"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-3 rounded-full bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-teal-400 outline-none"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone")}
              className="w-full p-3 rounded-full bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-teal-400 outline-none"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Previous Job Title (optional)"
              {...register("prevPosition")}
              className="w-full p-3 rounded-full bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-teal-400 outline-none"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Previous Company (optional)"
              {...register("prevCompany")}
              className="w-full p-3 rounded-full bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-teal-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-200 text-sm font-medium mb-1">
              Upload Resume (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              {...register("resume")}
              className="w-full p-2 rounded-xl bg-white/20 text-gray-200 file:bg-teal-600 file:text-white file:rounded-lg file:px-4 file:py-2 file:border-0 file:mr-3 border border-white/30 focus:ring-2 focus:ring-teal-400 outline-none"
            />
            {errors.resume && (
              <p className="text-red-400 text-sm mt-1">{errors.resume.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 active:scale-95 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddApplication;
