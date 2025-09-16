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
    .notRequired() // make it optional
    .test("fileType", "Unsupported file format", (value) => {
      if (!value || !value[0]) return true; // allow empty
      return ["image/jpeg", "image/png", "image/webp"].includes(value[0].type);
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
    resolver: yupResolver(schema) as any,
  });
  const logoWatch = watch("logo");
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.company);
  const industryOptions = [
  "Software Development",
  "Artificial Intelligence / Machine Learning",
  "Cybersecurity",
  "Cloud Computing",
  "Data Science / Analytics",
  "Marketing & Advertising",
  "Human Resources",
  "Finance & Accounting",
  "Sales",
  "Graphic Design",
  "Content Creation",
  "Animation",
  "UX/UI Design",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electronics & Hardware",
  "Pharmaceuticals",
  "Hospitals & Healthcare Services",
  "Research & Development",
  "Educational Institutes",
  "Other"
];


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

    if (data.logo && data.logo[0]) {
      formData.append("logo", data.logo[0] as File);
    }

    try {
      await dispatch(addCompany(formData)).unwrap();
      toast.success("Company added successfully");
      reset();
      router.push("/admin/dashboard?tab=companies");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload Failed");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-teal-900 to-black p-20 overflow-hidden">
      {/* Decorative blurred shapes */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal-500/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full mix-blend-overlay filter blur-2xl animate-[pulse_6s_ease-in-out_infinite]" />

      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10 relative z-10">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8 tracking-wide drop-shadow-lg">
          Add Company
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Company Name */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-teal-200 mb-2">
              Company Name
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter company name"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all hover:bg-white/20"
            />
            <p className="text-red-400 text-xs mt-1">{errors.name?.message}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-teal-200 mb-2">
              Industry
            </label>
            <select
              {...register("industry")}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white 
                        placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all hover:bg-white/20"
              defaultValue=""
            >
              <option value="" disabled className="bg-gray-900 text-white">
                Select Industry
              </option>
              {industryOptions.map((ind, idx) => (
                <option key={idx} value={ind} className=" text-black">
                  {ind}
                </option>
              ))}
            </select>
            <p className="text-red-400 text-xs mt-1">{errors.industry?.message}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-teal-200 mb-2">
              Location
            </label>
            <input
              type="text"
              {...register("location")}
              placeholder="Enter location"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all hover:bg-white/20"
            />
            <p className="text-red-400 text-xs mt-1">{errors.location?.message}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-teal-200 mb-2">
              Website
            </label>
            <input
              type="text"
              {...register("website")}
              placeholder="https://example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all hover:bg-white/20"
            />
            <p className="text-red-400 text-xs mt-1">{errors.website?.message}</p>
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col">
            <label className="text-sm font-semibold text-teal-200 mb-2">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Company description"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all hover:bg-white/20"
            />
            <p className="text-red-400 text-xs mt-1">
              {errors.description?.message}
            </p>
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="text-sm font-semibold text-teal-200 mb-3 block">
              Company Logo
            </label>
            <div className="flex flex-col items-center">
              <label className="flex flex-col items-center justify-center w-full p-6 rounded-xl border border-dashed border-white/20 bg-white/5 cursor-pointer hover:border-teal-400 transition-all">
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
                    <p className="text-gray-400 text-sm">
                      Tap to upload company logo
                    </p>
                  </>
                )}
                <input type="file" className="hidden" {...register("logo")} />
              </label>

              {/* Remove Button */}
              {preview && (
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null); 
                    reset({ ...watch(), logo: undefined, }); 
                  }}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Remove Logo
                </button>
              )}
            </div>
            <p className="text-red-400 text-xs mt-1">{errors.logo?.message}</p>
          </div>

          <div className="col-span-1 md:col-span-2 flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => router.push("/admin/dashboard?tab=companies")}
              className="w-1/2 px-5 py-3 rounded-xl border border-white/20 bg-white/10 text-gray-300 hover:bg-white/20 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`w-1/2 px-6 py-3 rounded-xl text-white font-medium shadow-lg transition 
                ${
                  loading
                    ? "opacity-50 cursor-not-allowed bg-teal-600"
                    : "bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 hover:from-teal-500 hover:to-teal-600"
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
