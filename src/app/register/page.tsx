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
//   phone: yup.string().matches(/^[0-9]{10}$/, "Phone must be 10 digits").required(),
//   image: yup
//   .mixed<FileList>()
//   .optional() 
//   .test("fileType", "Only jpg, jpeg, or png files are allowed", (value) => {
//     if (!value || value.length === 0) return true; 
//     return ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type);
//   }),

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

//         // localStorage.setItem("user", JSON.stringify(userData));
//         // localStorage.setItem("token", token);
//         Cookies.set("token", token, {
//                 expires: 1, 
//                 path: "/",
//                 sameSite: "Lax",
//         });

//         Cookies.set("user", JSON.stringify({ role: userData.role, name: userData.name }), {
//                 expires: 1,
//                 path: "/",
//                 sameSite: "Lax",
//         });
//         toast.success("Register successfully");
//         reset();
//         router.push("/list");
//       })
//       .catch((err: any) => {
//         console.error("Registration failed:", err);
//         toast.error('Registration failed')
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-3 max-w-md mx-auto mt-10">
//       <input type="text" placeholder="Name" {...register("name")} />
//       <p className="text-red-500">{errors.name?.message}</p>

//       <input type="email" placeholder="Email" {...register("email")} />
//       <p className="text-red-500">{errors.email?.message}</p>

//       <input type="file" {...register("image")} />
//       <p className="text-red-500">{errors.image?.message}</p>

//       <input type="password" placeholder="Password" {...register("password")} />
//       <p className="text-red-500">{errors.password?.message}</p>

//       <input type="text" placeholder="Phone" {...register("phone")} />
//       <p className="text-red-500">{errors.phone?.message}</p>

//       <input type="text" placeholder="Skills" {...register("skills")} />
//       <p className="text-red-500">{errors.skills?.message}</p>

//       <input type="text" placeholder="Interested jobs" {...register("interests")} />
//       <p className="text-red-500">{errors.interests?.message}</p>

//       <button type="submit" className="bg-blue-600 text-white p-2 rounded">
//         Register
//       </button>
//     </form>
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

        toast.success("Register successfully");
        reset();
        router.push("/list");
      })
      .catch((err: any) => {
        console.error("Registration failed:", err);
        toast.error("Registration failed");
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-black px-6 relative">
      <div className="fixed top-6 left-6">
        <Link href="/" className="text-1xl font-extrabold text-[#309689]">
          TALMIRA
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-[21px] font-bold text-white mb-6 text-center">
          FIND YOUR DREAM JOB TODAY!
        </h1>
        <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl p-10">

          <form
            onSubmit={handleSubmit(handleRegister)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name")}
                className="w-full rounded-full border border-gray-300 px-4 py-2 
                           focus:ring-2 focus:ring-[#309689] outline-none"
              />
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full rounded-full border border-gray-300 px-4 py-2 
                           focus:ring-2 focus:ring-[#309689] outline-none"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            <div className="md:col-span-2">
              <input
              
                type="file"
                {...register("image")}
                className="w-full rounded-full border border-gray-300 px-4 py-2 bg-gray-50 
                           file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                           file:bg-[#309689] file:text-white hover:file:bg-emerald-700"
              />
              <p className="text-red-500 text-sm">{errors.image?.message}</p>
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full rounded-full border border-gray-300 px-4 py-2 
                           focus:ring-2 focus:ring-[#309689] outline-none"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            <div>
              <input
                type="text"
                placeholder="Phone"
                {...register("phone")}
                className="w-full rounded-full border border-gray-300 px-4 py-2 
                           focus:ring-2 focus:ring-[#309689] outline-none"
              />
              <p className="text-red-500 text-sm">{errors.phone?.message}</p>
            </div>

            <div>
              <input
                type="text"
                placeholder="Skills"
                {...register("skills")}
                className="w-full rounded-full border border-gray-300 px-4 py-2 
                           focus:ring-2 focus:ring-[#309689] outline-none"
              />
              <p className="text-red-500 text-sm">{errors.skills?.message}</p>
            </div>

            <div>
              <input
                type="text"
                placeholder="Interested Jobs"
                {...register("interests")}
                className="w-full rounded-full border border-gray-300 px-4 py-2 
                           focus:ring-2 focus:ring-[#309689] outline-none"
              />
              <p className="text-red-500 text-sm">{errors.interests?.message}</p>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-[#309689] hover:bg-emerald-700 text-white 
                           font-semibold py-2 rounded-full transition duration-200"
              >
                Register
              </button>
            </div>

            <div className="md:col-span-2 text-center mt-4">
              <p className="text-sm text-gray-600">
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
    </div>
  );


};

export default Register;
