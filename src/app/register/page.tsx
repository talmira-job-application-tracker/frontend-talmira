"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "@/redux/slices/authSlice";
import type { AppDispatch } from "@/redux/store";
import toast from "react-hot-toast";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

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
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required(),
  image: yup
    .mixed<FileList>()
    .optional()
    .test("fileType", "Only jpg, jpeg, or png files are allowed", (value) => {
      if (!value || value.length === 0) return true;
      return ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type);
    }),
  skills: yup.string().required("Skills are required"),
  interests: yup.string().required("Interests are required"),
});

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { login } = useAuth();

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
    formData.append("skills", formValues.skills.trim());
    formData.append("interests", formValues.interests.trim());
    if (formValues.image && formValues.image.length > 0) {
      formData.append("image", formValues.image[0]);
    }

    dispatch(registerUser(formData))
      .unwrap()
      .then((res: { token: string; data: any }) => {
        const { token, data: userData } = res;

        login(
          { _id: userData._id, role: userData.role, name: userData.name, image: userData.image },
          token
        );

        toast.success("Registered successfully");
        reset();
        router.push("/");
      })
      .catch(() => {
        toast.error("Registration failed");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-10 sm:mt-16">
      <div className="w-full max-w-md sm:max-w-2xl lg:max-w-4xl bg-grey backdrop-blur-md border border-white/20 shadow-lg p-4 sm:p-6 lg:p-8 rounded-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6 sm:mb-8">
          Create an Account
        </h2>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Full Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#309689]"
            />
            <p className="text-red-400 text-sm mt-1">{errors.name?.message}</p>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#309689]"
            />
            <p className="text-red-400 text-sm mt-1">{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#309689]"
            />
            <p className="text-red-400 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>

          {/* Phone */}
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone")}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#309689]"
            />
            <p className="text-red-400 text-sm mt-1">{errors.phone?.message}</p>
          </div>

          {/* Skills */}
          <div>
            <input
              type="text"
              placeholder="Skills (Separate with commas)"
              {...register("skills")}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#309689]"
            />
            <p className="text-red-400 text-sm mt-1">{errors.skills?.message}</p>
          </div>

          {/* Interests */}
          <div>
            <input
              type="text"
              placeholder="Interested Jobs (Separate with commas)"
              {...register("interests")}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#309689]"
            />
            <p className="text-red-400 text-sm mt-1">
              {errors.interests?.message}
            </p>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <input
              type="file"
              {...register("image")}
              className="w-full p-2 rounded-xl bg-white/20 text-black/50 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#309689] file:text-white hover:file:bg-[#257166] focus:outline-none focus:ring-2 focus:ring-[#309689]"
            />
            <p className="text-red-400 text-sm mt-1">{errors.image?.message}</p>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#309689] hover:bg-[#257166] transition text-white font-semibold shadow-md"
            >
              Register
            </button>
          </div>

          {/* Footer */}
          <div className="md:col-span-2 text-center">
            <p className="text-white text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#309689] font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
