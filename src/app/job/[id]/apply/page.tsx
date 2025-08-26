"use client"

import api from '@/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup'

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

const  AddApplication = () => {
    const {id} = useParams(); //jobid
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormData>({
        resolver: yupResolver(schema) as any
    })

    const onSubmit = async (data: FormData) => {
        setLoading(true);

        try{
            const formData = new FormData();
            formData.append("jobId", id as string);
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("phone", data.phone);
            formData.append("resume", data.resume[0]);
            
            const res = await api.post("/application/add", formData)

            toast.success(res.data.message || "Application submitted!")
            reset();
            router.push("/");
        } catch (err : any){
            toast.error(err.response?.data?.message || "Failed to apply")
        } finally {
            setLoading(false);
        }
    };


    return (
      <div className="max-w-lg mx-auto mt-10 p-6 border rounded-xl shadow-lg bg-white">
      <h1 className="text-2xl font-semibold mb-6">Apply for this Job</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            {...register("name")}
            className="w-full p-2 border rounded-md"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            {...register("phone")}
            className="w-full p-2 border rounded-md"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Resume */}
        <div>
          <label className="block text-sm font-medium">Upload Resume (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            {...register("resume")}
            className="w-full p-2 border rounded-md"
          />
          {errors.resume && (
            <p className="text-red-500 text-sm">{errors.resume.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
    );
};

export default AddApplication;