"use client";

import { addCompany } from "@/redux/slices/companySlice";
import { AppDispatch, RootState } from "@/redux/store";
import { cFormType } from "@/types/companyType";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as yup from 'yup'

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
    })
})

const AddCompany = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}, reset, watch} = useForm<cFormType>({
        resolver: yupResolver(schema)
    })
    const logoWatch = watch('logo');
    const dispatch = useDispatch<AppDispatch>()
    const {loading} =useSelector((state: RootState) => state.company); 

    useEffect(() => {
         const file = logoWatch?.[0];
         if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
        setPreview(null);
        }
    },[logoWatch])

    const onSubmit = async ( data : cFormType )=>{
    const formData =  new FormData();
    formData.append('name', data.name);
    formData.append('industry', data.industry);
    formData.append('description', data.description);
    formData.append('location', data.location);
    formData.append('website', data.website);
    formData.append('logo', data.logo[0] as File);

    try{
        await dispatch(addCompany(formData)).unwrap()
            toast.success("Company added successfully")
            reset()
            router.push("/");
      } catch (error) {
          console.error('Upload failed:', error);
          toast.error("Upload Failed")
      }
};


return (
    <div>
        {preview && (
        <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded" />
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 max-w-md mx-auto mt-10">
            <input type="text" placeholder="name" {...register("name")}/>
            <p className="text-red-500">{errors.name?.message}</p> 

            <input type="text" placeholder="industry" {...register("industry")}/>
            <p className="text-red-500">{errors.industry?.message}</p>

            <textarea placeholder="description" {...register("description")}/>
            <p className="text-red-500">{errors.description?.message}</p>

            <input type="text" placeholder="location" {...register("location")}/>
            <p className="text-red-500">{errors.location?.message}</p>

            <input type="text" placeholder="website" {...register("website")}/>
            <p className="text-red-500">{errors.website?.message}</p>

            <input type="file" {...register("logo")}/>
            <p className="text-red-500">{errors.logo?.message}</p>

            <button 
            type="submit" disabled={loading}
            className={`bg-blue-600 text-white p-2 rounded ${loading && "opacity-50 cursor-not-allowed"}`}>
                Add
            </button>
        </form>
    </div>
);
};

export default AddCompany;