
"use client"
import api from "@/api"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as yup from "yup"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"  
import Cookies from "js-cookie"


const schema = yup.object().shape({
  email: yup.string().required("Enter your email").email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Must be at least 6 characters"),
})

type LoginForm = {
  email: string
  password: string
}

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()   

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    try {
      const res = await api.post("/auth/login", data)
      const token = res.data.token
      const user = res.data.data

      login(
        { _id: user._id, role: user.role, name: user.name, image: user.image },
        token
      )

      Cookies.set("token", token, {
        expires: 1, 
        path: "/",
        sameSite: "Lax",
      })

      toast.success("Login successful")
      router.push("/")
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center backdrop-blur-sm">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-black/30 backdrop-blur-md border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Welcome Back To Talmira!
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-white text-sm mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-[#309689]"
              placeholder="Enter your email"
            />
            <p className="text-red-400 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-white text-sm mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-[#309689]"
              placeholder="Enter your password"
            />
            <p className="text-red-400 text-sm mt-1">{errors.password?.message}</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#309689] hover:bg-[#257166] transition text-white font-semibold shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-white text-center">
            Do not have an account?
            <a href="/register" className="text-[#257166] hover:underline"> Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
