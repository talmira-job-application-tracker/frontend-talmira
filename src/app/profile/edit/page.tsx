"use client"

import { AppDispatch, RootState } from "@/redux/store"
import { useEffect, useMemo, useState } from "react";
import Cookies from 'js-cookie'
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProfile, viewProfile } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";
import Image from "next/image";

export type FormData = {
  name: string;
  email: string;
  password: string;   
  phone: string;
  age: string;
  image?: FileList;
  skills: string[];     
  interests: string[];   
};

const EditProfile = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const [hasExistingImage, setHasExistingImage] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const schema = useMemo(() => {
        return yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().optional(),
        phone: yup.string().matches(/^[0-9]+$/, "Phone must be digits only").required("Phone is required"),
        age: yup.string(),
        skills: yup.array().of(yup.string()).min(1, "At least one skill required"),
        interests: yup.array().of(yup.string()).min(1, "At least one interest required"),
        image: yup
            .mixed()
            .test("fileRequired", "Image is required", (value) => {
            if (hasExistingImage) return true;
            return value instanceof FileList && value.length > 0;
            })
        }) as yup.ObjectSchema<FormData>;
    }, [hasExistingImage]);

    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
            const storedUser = Cookies.get("user")
            if(!storedUser) return;
            
            const parsed = JSON.parse(storedUser)
            if(parsed._id) {
                dispatch(viewProfile())
                .then((res) => {
                    const userData = res.payload.data;
                    reset({
                        name: userData.name,
                        email: userData.email,
                        password: userData.password,
                        phone: userData.phone,
                        age: userData.age,
                        interests: userData.interests,
                        skills: userData.skills,
                    });

                    if (userData.image) {
                        const imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userData.image.replace(/^\/+/, '')}`;
                        setPreview(imageUrl);
                        setHasExistingImage(true); 
                    }
                })
                .catch((err) => {
                    console.error("Error fetching user:", err);
                });
            }
    },[reset, dispatch]);

    const onSubmit = async(data: FormData) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);        
        formData.append("age", data.age);
        formData.append("phone", data.phone);
        formData.append("skills", data.skills.join(","));
        formData.append("interests", data.interests.join(","));

        if (data.password) formData.append("password", data.password);

        if(data.image && data.image.length > 0){
            formData.append("image", data.image[0]);
        }
        try {
            await dispatch(editProfile(formData))
            toast.success("Profile Updated")
            router.push("/profile");
        } catch (err) {
            console.error("Update failed:", err);
            toast.error("Failed to Update")
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setHasExistingImage(false); 
        }
    };

    return (
    <div className="min-h-screen px-4 py-10">
      <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#6b4c3b]">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div className="flex flex-col items-center">
            <div className="w-24 h-24 relative mb-2">
              <Image
                src={preview || "/images/banner7.jpg"}
                alt="Profile Preview"
                fill
                className="rounded-full object-cover border border-gray-300"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
              className="text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:border-0 file:bg-[#d5bdaf] file:text-white file:rounded-md cursor-pointer"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-[#6b4c3b] font-medium mb-1">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b08968] bg-white"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[#6b4c3b] font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b08968] bg-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[#6b4c3b] font-medium mb-1">password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b08968] bg-white"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[#6b4c3b] font-medium mb-1">Age</label>
            <input
              type="text"
              {...register("age")}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b08968] bg-white"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[#6b4c3b] font-medium mb-1">phone</label>
            <input
              type="text"
              {...register("phone")}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b08968] bg-white"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[#6b4c3b] font-medium mb-1">interests</label>
            <input
              type="text"
              {...register("interests")}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b08968] bg-white"
            />
            {errors.interests && (
              <p className="text-red-500 text-sm mt-1">{errors.interests.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[#6b4c3b] font-medium mb-1">skills</label>
            <input
              type="text"
              {...register("skills")}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b08968] bg-white"
            />
            {errors.skills && (
              <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#7f5539] text-white py-2 rounded-lg hover:bg-[#6b4c3b] transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
  </div>
  );
}

export default EditProfile