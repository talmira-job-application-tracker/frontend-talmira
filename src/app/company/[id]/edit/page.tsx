'use client';

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getCompany, updateCompany } from "@/redux/slices/companySlice";
import toast from "react-hot-toast";
import { Building2, MapPin, Image as ImageIcon, Loader2 } from "lucide-react";
import { cFormType, CompanyType } from "@/types/companyType";
import Image from "next/image";

const schema = yup.object({
  name: yup.string().required("Company name is required"),
  industry: yup.string().required("Industry is required"),
  location: yup.string().required("Location is required"),
  description: yup.string().notRequired(),
  website: yup.string().url("Enter a valid URL").required("Website link is required"),
});

const EditCompany = () => {
  const { id } = useParams();
  const companyId = id as string;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.company);

  const [preview, setPreview] = useState<string | null>(null);
  const [removeLogo, setRemoveLogo] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const industryOptions = [
    "Technology & IT",
    "Business & Professional",
    "Creative & Media",
    "Industrial & Manufacturing",
    "Marketing & Advertising",
    "Agriculture & Environment",
    "Healthcare & Life Sciences",
    "Electronics & Hardware",
    "Research & Development",
    "Educational Institutes",
    "Food & Beverages",
  ];

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", industry: "", location: "", description: "", website: "" },
  });

  useEffect(() => {
    if (companyId) {
      dispatch(getCompany(companyId)).then((res) => {
        if (res.payload) {
          const { name, industry, location, description, website, logo } = res.payload;
          reset({ name, industry: industry || "", location, description, website });
          if (logo) {
            const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");
            setPreview(`${baseURL}/${logo.replace(/^\/+/, "")}`);
          }
        }
      });
    }
  }, [companyId, dispatch, reset]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("industry", data.industry);
    formData.append("description", data.description || "");
    formData.append("location", data.location);
    formData.append("website", data.website);
    if (logoFile) formData.append("logo", logoFile);
    if (removeLogo) formData.append("removeLogo", "true");

    const result = await dispatch(updateCompany({ id: companyId, formData }));

    if (updateCompany.fulfilled.match(result)) {
      toast.success("Company updated successfully!");
      router.push(`/company/${companyId}`);
    } else {
      toast.error("Failed to update company");
    }
  };

  return (
    <div className="min-h-screen py-19 px-4">
      <div className="max-w-4xl mx-auto bg-black/30 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl p-8 space-y-5">
        <h1 className="text-3xl font-bold text-teal-400 text-center">Edit Company Details</h1>
        <p className="text-center text-gray-200">Update your company profile to keep information accurate and professional.</p>

        {/* Basic Info */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-teal-400 flex items-center gap-2">
            <Building2 /> Basic Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-gray-200 font-medium flex items-center gap-2 mb-1">
                 Company Name
              </label>
              <input
                {...register("name")}
                placeholder="Company Name"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="text-gray-200 font-medium flex items-center gap-2 mb-1">
                 Industry
              </label>
              <select
                {...register("industry")}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
              >
                <option value="">Select Industry</option>
                {industryOptions.map((ind, idx) => (
                  <option key={idx} value={ind} className="text-black">{ind}</option>
                ))}
              </select>
              {errors.industry && <p className="text-red-400 text-sm mt-1">{errors.industry.message}</p>}
            </div>

            <div>
              <label className="text-gray-200 font-medium flex items-center gap-2 mb-1">
               Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Description"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none transition resize-none"
              />
            </div>
          </div>
        </div>

        {/* Location & Website */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-teal-400 flex items-center gap-2">
            <MapPin /> Location & Website
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-200 font-medium flex items-center gap-2 mb-1">
                 Location
              </label>
              <input
                {...register("location")}
                placeholder="Location"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
              />
              {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>}
            </div>

            <div>
              <label className="text-gray-200 font-medium flex items-center gap-2 mb-1">
                 Website
              </label>
              <input
                {...register("website")}
                placeholder="Website"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
              />
              {errors.website && <p className="text-red-400 text-sm mt-1">{errors.website.message}</p>}
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-teal-400 flex items-center gap-2">
            <ImageIcon /> Branding
          </h2>

          <div>
            <label className="text-gray-200 font-medium flex items-center gap-2 mb-1">
              Logo
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setLogoFile(file);
                    setPreview(URL.createObjectURL(file));
                    setRemoveLogo(false);
                  }
                }}
                className="w-full text-white focus:outline-none"
              />
              {preview && !preview.includes("default-logo.png") && (
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setRemoveLogo(true);
                    setLogoFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="px-3 py-1 text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
                >
                  Remove
                </button>
              )}
            </div>
            {preview && !preview.includes("default-logo.png") && (
              <Image
                src={preview}
                alt="Logo"
                width={96} 
                height={96} 
                className="mt-4 rounded-lg border"
              />
            )}
          </div>
        </div>

        {/* Submit */}
         <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
          className="w-full py-3 rounded-2xl font-semibold text-white bg-teal-500 to-emerald-500 hover:opacity-90 transform hover:scale-[1.02] transition flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Update Company"}
        </button>
      </div>
    </div>
  );
};

export default EditCompany;

