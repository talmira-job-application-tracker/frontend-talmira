"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { registerUser } from "@/redux/slices/authSlice";
import type { AppDispatch } from "@/redux/store";


type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  phone: string;
  image: FileList;
  skills: string;      
  interests: string;   
};

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").min(6),
  phone: yup.string().matches(/^[0-9]{10}$/, "Phone must be 10 digits").required(),
  image: yup
    .mixed<FileList>()
    .test("required", "Image is required", (value) => value && value.length > 0)
    .test("fileType", "Only jpg, jpeg, or png files are allowed", (value) => {
      if (!value || value.length === 0) return false;
      return ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type);
    }),
  skills: yup.string().required("Skills are required"),
  interests: yup.string().required("Interests are required"),
});


const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schema) as any,
  });

  
  const handleRegister = (formValues: RegisterFormValues) => {
    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("email", formValues.email);
    formData.append("password", formValues.password);
    formData.append("phone", formValues.phone);
    formData.append("image", formValues.image[0]);
    formData.append("skills", formValues.skills || "");
    formData.append("interests", formValues.interests || "");

    dispatch(registerUser(formData))
      .unwrap()
      .then((res: { token: string; data: any }) => {
        const { token, data: userData } = res;

        
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        
        Cookies.set("token", token, { expires: 1, path: "/", sameSite: "Lax" });
        Cookies.set("user", JSON.stringify(userData), { expires: 1, path: "/", sameSite: "Lax" });

        reset();
        router.push("/list");
      })
      .catch((err: any) => {
        console.error("Registration failed:", err);
        alert(err?.message || "Registration failed");
      });
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-3 max-w-md mx-auto mt-10">
      <input type="text" placeholder="Name" {...register("name")} />
      <p className="text-red-500">{errors.name?.message}</p>

      <input type="email" placeholder="Email" {...register("email")} />
      <p className="text-red-500">{errors.email?.message}</p>

      <input type="file" {...register("image")} />
      <p className="text-red-500">{errors.image?.message}</p>

      <input type="password" placeholder="Password" {...register("password")} />
      <p className="text-red-500">{errors.password?.message}</p>

      <input type="text" placeholder="Phone" {...register("phone")} />
      <p className="text-red-500">{errors.phone?.message}</p>

      <input type="text" placeholder="Skills" {...register("skills")} />
      <p className="text-red-500">{errors.skills?.message}</p>

      <input type="text" placeholder="Interested jobs" {...register("interests")} />
      <p className="text-red-500">{errors.interests?.message}</p>

      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
};

export default Register;
