"use client";

import { AppDispatch } from "@/redux/store";
import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
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
  const [role, setRole] = useState<"user" | "admin">("user"); // role state
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const schema = useMemo(() => {
    return yup.object().shape({
      name: yup.string().required("Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup.string().optional(),
      ...(role === "user" && {
        phone: yup
          .string()
          .matches(/^[0-9]+$/, "Phone must be digits only")
          .required("Phone is required"),
        age: yup.string(),
        skills: yup.array().of(yup.string()),
        interests: yup.array().of(yup.string()),
        image: yup
          .mixed()
          .test("fileRequired", "Image is required", (value) => {
            if (hasExistingImage) return true;
            return value instanceof FileList && value.length > 0;
          }),
      }),
    }) as yup.ObjectSchema<FormData>;
  }, [hasExistingImage, role]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (!storedUser) return;

    const parsed = JSON.parse(storedUser);
    if (parsed.role) setRole(parsed.role); // set role

    if (parsed._id) {
      dispatch(viewProfile())
        .then((res) => {
          const userData = res.payload.data;
          reset({
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            age: userData.age,
            interests: userData.interests,
            skills: userData.skills,
          });

          if (userData.image) {
            const imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userData.image.replace(
              /^\/+/,
              ""
            )}`;
            setPreview(imageUrl);
            setHasExistingImage(true);
          }
        })
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [reset, dispatch]);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);

    if (data.password && data.password.trim() !== "" && data.password !== "undefined") {
      formData.append("password", data.password);
    }



    if (role === "user") {
      formData.append("age", data.age);
      formData.append("phone", data.phone);
      formData.append("skills", JSON.stringify(data.skills));
      formData.append("interests", JSON.stringify(data.interests));
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }
    }

    try {
      await dispatch(editProfile(formData));
      toast.success("Profile Updated");
      router.push("/profile");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to Update");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setHasExistingImage(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-30 flex justify-center items-center bg-gradient-to-br from-teal-700 via-black to-gray-900">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Profile Image (user only) */}
          {role === "user" && (
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 relative mb-2">
                <Image
                  src={preview || "/images/noprofile.png"}
                  alt="Profile Preview"
                  fill
                  className="rounded-full object-cover border border-teal-500"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={handleImageChange}
                className="text-sm text-gray-200 file:mr-4 file:py-1 file:px-3 file:border-0 file:bg-teal-600 file:text-white file:rounded-md cursor-pointer"
              />
              {errors.image && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>
          )}

          {/* Shared fields */}
          <InputField label="Name" type="text" register={register("name")} error={errors.name?.message} />
          <InputField label="Email" type="email" register={register("email")} error={errors.email?.message} />
          <InputField label="Password" type="password" register={register("password")} error={errors.password?.message} />

          {/* User-only fields */}
          {role === "user" && (
            <>
              <InputField label="Age" type="text" register={register("age")} error={errors.age?.message} />
              <InputField label="Phone" type="text" register={register("phone")} error={errors.phone?.message} />
              <InputField label="Interests" type="text" register={register("interests")} error={errors.interests?.message} />
              <InputField label="Skills" type="text" register={register("skills")} error={errors.skills?.message} />
            </>
          )}

          <div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-200 shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Small reusable input field
const InputField = ({
  label,
  type,
  register,
  error,
}: {
  label: string;
  type: string;
  register: any;
  error?: string;
}) => (
  <div>
    <label className="block text-sm text-gray-200 mb-1">{label}</label>
    <input
      type={type}
      {...register}
      className="w-full px-4 py-2 rounded-md border border-gray-600 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
);

export default EditProfile;
