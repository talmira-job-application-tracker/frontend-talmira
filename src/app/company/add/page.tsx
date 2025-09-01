"use client";

import { addCompany } from "@/redux/slices/companySlice";
import { AppDispatch, RootState } from "@/redux/store";
import { cFormType } from "@/types/companyType";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Company Name required"),
  industry: yup.string().required("Enter the industry type"),
  description: yup.string().required("Description required"),
  location: yup.string().required("Location required"),
  website: yup.string().url().required("Website required"),
  logo: yup
    .mixed<FileList>()
    .required("Logo is required")
    .test("fileType", "Unsupported file format", (value) => {
      return (
        value &&
        value[0] &&
        ["image/jpeg", "image/png", "image/webp"].includes(value[0].type)
      );
    }),
});

const AddCompany = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<cFormType>({
    resolver: yupResolver(schema),
  });
  const logoWatch = watch("logo");
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.company);

  useEffect(() => {
    const file = logoWatch?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [logoWatch]);

  const onSubmit = async (data: cFormType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("industry", data.industry);
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append("website", data.website);
    formData.append("logo", data.logo[0] as File);

    try {
      await dispatch(addCompany(formData)).unwrap();
      toast.success("Company added successfully");
      reset();
      router.push("/");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl my-3 bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent mb-6">
          Add Company
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          {/* Company Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Company Name"
                {...register("name")}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <p className="text-red-400 text-sm">{errors.name?.message}</p>
            </div>
            <div>
              <input
                type="text"
                placeholder="Industry"
                {...register("industry")}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <p className="text-red-400 text-sm">{errors.industry?.message}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <textarea
              placeholder="Description"
              {...register("description")}
              rows={4}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            <p className="text-red-400 text-sm">{errors.description?.message}</p>
          </div>

          {/* Location & Website */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Location"
                {...register("location")}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <p className="text-red-400 text-sm">{errors.location?.message}</p>
            </div>
            <div>
              <input
                type="text"
                placeholder="Website"
                {...register("website")}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <p className="text-red-400 text-sm">{errors.website?.message}</p>
            </div>
          </div>

          {/* Logo Upload */}
            <div>
            <label className="flex flex-col items-center justify-center w-full p-6 rounded-xl border border-gray-700 bg-gray-800 cursor-pointer hover:border-teal-400 transition">
                {preview ? (
                <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full shadow-md border-2 border-teal-500 mb-2"
                />
                ) : (
                <>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6h.1a5 5 0 010 10h-1m-4 4l-4-4m0 0l4-4m-4 4h12"
                    />
                    </svg>
                    <p className="text-gray-400">Tap to upload company logo</p>
                </>
                )}
                <input type="file" className="hidden" {...register("logo")} />
            </label>
            <p className="text-red-400 text-sm">{errors.logo?.message}</p>
            </div>


          {/* Buttons */}
          <div className="flex gap-4 justify-center mt-4">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-5 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white font-medium shadow-lg transition 
              ${
                loading
                  ? "opacity-50 cursor-not-allowed bg-teal-600"
                  : "bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600"
              }`}
            >
              {loading ? "Adding..." : "Add Company"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompany;
