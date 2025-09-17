'use client';

import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { getCompany, updateCompany } from "@/redux/slices/companySlice";
import { AppDispatch, RootState } from "@/redux/store";
import toast from "react-hot-toast";
import {
  Building2,
  FileText,
  MapPin,
  Globe,
  Image as ImageIcon,
  Type,
} from "lucide-react";

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
  const [preview, setPreview] = useState<string | null>(null);
  const [removeLogo, setRemoveLogo] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.company);

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      industry: "",
      location: "",
      description: "",
      website: "",
    },
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

  // Form submit
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("industry", data.industry);
    formData.append("description", data.description || "");
    formData.append("location", data.location);
    formData.append("website", data.website);

    // Append logo if selected
    if (logoFile) {
      formData.append("logo", logoFile);
    }

    // Remove logo if needed
    if (removeLogo) {
      formData.append("removeLogo", "true");
    }

    const result = await dispatch(updateCompany({ id: companyId, formData }));

    if (updateCompany.fulfilled.match(result)) {
      toast.success("Company updated successfully!");
      router.push(`/company/${companyId}`);
    } else {
      toast.error("Failed to update company");
    }
  };

  return (
    <div className="max-w-4xl m-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">Edit Company Details</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        <section>
          <h3 className="text-lg font-semibold text-[#309689] mb-4">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600">Company Name</label>
              <div className="flex items-center gap-2 border-b border-gray-300 focus-within:border-[#309689] py-2">
                <Type size={16} className="text-gray-500" />
                <input
                  {...register("name")}
                  className="w-full focus:outline-none"
                />
              </div>
              <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
            </div>

            <div className="flex flex-col">
              <label className="block text-sm text-gray-600 mb-2">Industry</label>
              <select
                {...register("industry")}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 
                          focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all"
              >
                {industryOptions.map((ind, idx) => (
                  <option key={idx} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-sm mt-1">{errors.industry?.message}</p>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm text-gray-600">Description</label>
            <div className="flex items-start gap-2 border-b border-gray-300 focus-within:border-[#309689] py-2">
              <FileText size={16} className="text-gray-500 mt-1" />
              <textarea
                {...register("description")}
                rows={4}
                className="w-full focus:outline-none resize-none"
              />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-[#309689] mb-4">
            Location & Contact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600">Location</label>
              <div className="flex items-center gap-2 border-b border-gray-300 focus-within:border-[#309689] py-2">
                <MapPin size={16} className="text-gray-500" />
                <input
                  {...register("location")}
                  className="w-full focus:outline-none"
                />
              </div>
              <p className="text-red-500 text-sm mt-1">{errors.location?.message}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-600">Website</label>
              <div className="flex items-center gap-2 border-b border-gray-300 focus-within:border-[#309689] py-2">
                <Globe size={16} className="text-gray-500" />
                <input
                  {...register("website")}
                  className="w-full focus:outline-none"
                />
              </div>
              <p className="text-red-500 text-sm mt-1">{errors.website?.message}</p>
            </div>
          </div>
        </section>

        {/* Branding */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-[#309689] mb-2">Branding</h3>
          <div>
            <label className="block text-sm text-gray-600">Logo</label>
            <div className="flex items-center gap-2 border-b border-gray-300 focus-within:border-[#309689] py-2">
              <ImageIcon size={16} className="text-gray-500" />
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
                className="focus:outline-none"
              />
              {preview && !preview.includes("default-logo.png") && (
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setRemoveLogo(true);
                    setLogoFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="ml-2 text-red-500 border border-red-500 px-2 rounded hover:bg-red-500 hover:text-white transition"
                >
                  Remove
                </button>
              )}
            </div>

            {preview && !preview.includes("default-logo.png") && (
              <img
                src={preview}
                alt="Logo Preview"
                className="w-20 h-20 mt-4 object-cover rounded-lg border shadow-sm"
              />
            )}
          </div>
        </section>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#309689] text-white px-6 py-3 mb-3 rounded-md hover:bg-[#26776d] transition-colors"
          >
            {loading ? "Updating..." : "Update Company"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCompany;
