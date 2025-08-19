"use client";

import { addCompany } from "@/redux/slices/companySlice";
import { AppDispatch, RootState } from "@/redux/store";
import { cFormType } from "@/types/cFormType";
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
    website: yup.string().required("Website required"),
    logo: yup
        .mixed()
        .test('fileType', 'Unsupported file format', (value: any ) => {
        return value && value[0] && ['image/jpeg', 'image/png', 'image/webp'].includes(value[0].type)
    }) as yup.Schema<FileList>
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
    formData.append('title', data.name);
    formData.append('author', data.industry);
    formData.append('price', data.description);
    formData.append('description', data.location);
    formData.append('description', data.website);
    formData.append('image', data.logo[0] as File);

    try{
        dispatch(addCompany(formData)).then(() => {
            toast.success("Company added successfully")
            reset();
            setPreview(null);
            router.push('/')
        });         
      } catch (error) {
          console.error('Upload failed:', error);
          toast.error("Upload Failed")
      }
};


return (
    <div>

    </div>
)

}