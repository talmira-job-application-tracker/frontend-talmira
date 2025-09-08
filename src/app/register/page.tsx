
// "use client";

// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import Cookies from "js-cookie";
// import { useDispatch } from "react-redux";
// import { registerUser } from "@/redux/slices/authSlice";
// import type { AppDispatch } from "@/redux/store";
// import toast from "react-hot-toast";
// import Link from "next/link";
// import Image from "next/image";

// type RegisterFormValues = {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
//   image: FileList;
//   skills: string;
//   interests: string;
// };

// const schema = yup.object({
//   name: yup.string().required("Name is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().required("Password is required").min(6),
//   phone: yup
//     .string()
//     .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
//     .required(),
//   image: yup
//     .mixed<FileList>()
//     .optional()
//     .test("fileType", "Only jpg, jpeg, or png files are allowed", (value) => {
//       if (!value || value.length === 0) return true;
//       return ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type);
//     }),
//   skills: yup.string().required("Skills are required"),
//   interests: yup.string().required("Interests are required"),
// });

// const Register = () => {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<RegisterFormValues>({
//     resolver: yupResolver(schema) as any,
//   });

//   const handleRegister = (formValues: RegisterFormValues) => {
//     const formData = new FormData();
//     formData.append("name", formValues.name);
//     formData.append("email", formValues.email);
//     formData.append("password", formValues.password);
//     formData.append("phone", formValues.phone);
//     formData.append("skills", formValues.skills.trim());
//     formData.append("interests", formValues.interests.trim());
//     if (formValues.image && formValues.image.length > 0) {
//       formData.append("image", formValues.image[0]);
//     }

//     dispatch(registerUser(formData))
//       .unwrap()
//       .then((res: { token: string; data: any }) => {
//         const { token, data: userData } = res;

//         Cookies.set("token", token, {
//           expires: 1,
//           path: "/",
//           sameSite: "Lax",
//         });

//         Cookies.set(
//           "user",
//           JSON.stringify({ role: userData.role, name: userData.name }),
//           {
//             expires: 1,
//             path: "/",
//             sameSite: "Lax",
//           }
//         );

//         toast.success("Register successfully");
//         reset();
//         router.push("/");
//       })
//       .catch((err: any) => {
//         console.error("Registration failed:", err);
//         toast.error("Registration failed");
//       });
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-black px-6 relative">
//       <div className="fixed top-6 left-6 flex items-center space-x-2">
//         <Link href="/" className="flex items-center">
//           <Image 
//             src="/icons/Group.svg"   
//             alt="Talmira Logo" 
//             width={20} 
//             height={20} 
//           />
//           <span className="ml-2 text-xl font-extrabold text-[#309689]">
//             TALMIRA
//           </span>
//         </Link>
//       </div>

//       <div className="flex flex-col items-center justify-center flex-grow">
//         <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-5">
//             <h2 className="text-3xl font-bold text-center text-gray-600 mb-5">
//             Create an Account!
//           </h2>
//           <form
//             onSubmit={handleSubmit(handleRegister)}
//             className="grid grid-cols-1 md:grid-cols-2 gap-7"
//           >
//             <div>
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 {...register("name")}
//                 className="w-full rounded-full border border-gray-300 px-4 py-2 
//                            focus:ring-2 focus:ring-[#309689] outline-none"
//               />
//               <p className="text-red-500 text-sm">{errors.name?.message}</p>
//             </div>

//             <div>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 {...register("email")}
//                 className="w-full rounded-full border border-gray-300 px-4 py-2 
//                            focus:ring-2 focus:ring-[#309689] outline-none"
//               />
//               <p className="text-red-500 text-sm">{errors.email?.message}</p>
//             </div>

//             <div className="md:col-span-2">
//               <input
//                 type="file"
//                 {...register("image")}
//                 className="w-full rounded-full border border-gray-300 px-4 py-2 bg-gray-50 
//                            file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
//                            file:bg-[#309689] file:text-white hover:file:bg-emerald-700"
//               />
//               <p className="text-red-500 text-sm">{errors.image?.message}</p>
//             </div>

//             <div>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 {...register("password")}
//                 className="w-full rounded-full border border-gray-300 px-4 py-2 
//                            focus:ring-2 focus:ring-[#309689] outline-none"
//               />
//               <p className="text-red-500 text-sm">{errors.password?.message}</p>
//             </div>

//             <div>
//               <input
//                 type="text"
//                 placeholder="Phone Number"
//                 {...register("phone")}
//                 className="w-full rounded-full border border-gray-300 px-4 py-2 
//                            focus:ring-2 focus:ring-[#309689] outline-none"
//               />
//               <p className="text-red-500 text-sm">{errors.phone?.message}</p>
//             </div>

//             <div>
//               <input
//                 type="text"
//                 placeholder="Skills"
//                 {...register("skills")}
//                 className="w-full rounded-full border border-gray-300 px-4 py-2 
//                            focus:ring-2 focus:ring-[#309689] outline-none"
//               />
//               <p className="text-red-500 text-sm">{errors.skills?.message}</p>
//             </div>

//             <div>
//               <input
//                 type="text"
//                 placeholder="Interested Jobs"
//                 {...register("interests")}
//                 className="w-full rounded-full border border-gray-300 px-4 py-2 
//                            focus:ring-2 focus:ring-[#309689] outline-none"
//               />
//               <p className="text-red-500 text-sm">{errors.interests?.message}</p>
//             </div>

//             <div className="md:col-span-2">
//               <button
//                 type="submit"
//                 className="w-full bg-[#309689] hover:bg-emerald-700 text-white 
//                            font-semibold py-2 rounded-full transition duration-200"
//               >
//                 Register
//               </button>
//             </div>

//             <div className="md:col-span-2 text-center ">
//               <p className="text-sm text-gray-600">
//                 Already have an account?{" "}
//                 <Link
//                   href="/login"
//                   className="text-[#309689] font-semibold hover:underline"
//                 >
//                   Login
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;



"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { registerUser } from "@/redux/slices/authSlice";
import type { AppDispatch } from "@/redux/store";
import toast from "react-hot-toast";
import Link from "next/link";

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

        Cookies.set("token", token, {
          expires: 1,
          path: "/",
          sameSite: "Lax",
        });

        Cookies.set(
          "user",
          JSON.stringify({ role: userData.role, name: userData.name }),
          {
            expires: 1,
            path: "/",
            sameSite: "Lax",
          }
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
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-grey backdrop-blur-md border border-white/20 shadow-lg p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-black/80 mb-8">
          Create an Account
        </h2>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#309689]"
            />
            <p className="text-red-400 text-sm mt-1">{errors.name?.message}</p>
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#309689]"
            />
            <p className="text-red-400 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#309689]"
            />
            <p className="text-red-400 text-sm mt-1">{errors.password?.message}</p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone")}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#309689]"
            />
            <p className="text-red-400 text-sm mt-1">{errors.phone?.message}</p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Skills"
              {...register("skills")}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#309689]"
            />
            <p className="text-red-400 text-sm mt-1">{errors.skills?.message}</p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Interested Jobs"
              {...register("interests")}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#309689]"
            />
            <p className="text-red-400 text-sm mt-1">{errors.interests?.message}</p>
          </div>

          <div className="md:col-span-2">
            <input
              type="file"
              {...register("image")}
               className="w-full p-2 rounded-xl bg-white/20 text-black/50 placeholder-black/50 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#309689] file:text-white hover:file:bg-[#257166] focus:outline-none focus:ring-2 focus:ring-[#309689]"
            />
            <p className="text-red-400 text-sm mt-1">{errors.image?.message}</p>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
            className="w-full py-3 rounded-xl bg-[#309689] hover:bg-[#257166] transition text-white font-semibold shadow-md"
            >
              Register
            </button>
          </div>

          <div className="md:col-span-2 text-center">
            <p className="text-black text-sm">
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

