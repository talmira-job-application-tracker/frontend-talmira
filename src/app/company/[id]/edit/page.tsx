'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { getCompany, updateCompany } from "@/redux/slices/companySlice";
import { AppDispatch, RootState } from "@/redux/store";
import toast from "react-hot-toast";

const schema = yup.object({
  name: yup.string().required("Company name is required"),
  industry: yup.string().required("Industry is required"),
  location: yup.string().required("Location is required"),
  description: yup.string().nullable(),
  website: yup.string().url("Enter a valid URL").nullable(),
  logo: yup.mixed().notRequired(),
});

const EditCompany = () => {
  const { id } = useParams();
  const companyId = id as string;
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.company);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });


useEffect(() => {
  if (companyId) {
    dispatch(getCompany(companyId))
    .then((res) => {
      if (res.payload) {
        const { name, industry, location, description, website, logo } = res.payload;
        reset({ name, industry, location, description, website });

        if (logo) {
          const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '');
          setPreview(`${baseURL}/${logo.replace(/^\/+/, '')}`);
        }
      }
    });
  }
}, [companyId, dispatch, reset]);


  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("industry", data.industry);
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append("website", data.website);

    if (data.logo && data.logo.length > 0) {
      formData.append("logo", data.logo[0]);
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
    <div className="max-w-lg mx-auto p-6 bg-black shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Company</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Company Name</label>
          <input {...register("name")} className="border p-2 w-full" />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        <div>
          <label className="block">Industry</label>
          <input {...register("industry")} className="border p-2 w-full" />
          <p className="text-red-500 text-sm">{errors.industry?.message}</p>
        </div>

        <div>
          <label className="block">Location</label>
          <input {...register("location")} className="border p-2 w-full" />
          <p className="text-red-500 text-sm">{errors.location?.message}</p>
        </div>

        <div>
          <label className="block">Website</label>
          <input {...register("website")} className="border p-2 w-full" />
          <p className="text-red-500 text-sm">{errors.website?.message}</p>
        </div>

        <div>
          <label className="block">Logo</label>
          <input
            type="file"
            accept="image/*"
            {...register("logo")}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPreview(URL.createObjectURL(file)); 
              }
            }}
          />
        {preview && (
        <img
            src={preview}
            alt="Logo Preview"
            className="w-32 h-32 mt-2 object-cover rounded"
        />
        )}
        </div>

        <div>
          <label className="block">Description</label>
          <textarea {...register("description")} className="border p-2 w-full" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-black py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          {loading ? "Updating..." : "Update Company"}
        </button>
      </form>
    </div>
  );
};

export default EditCompany;
