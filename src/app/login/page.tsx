"use client"
import api from '@/api'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import Cookies from "js-cookie"
import { useRouter } from 'next/navigation'

const schema = yup.object().shape({
  email: yup.string().required("Enter your email").email("Invalid email format"),
  password: yup.string().required("Password is required").min(6, "Must be at least 6 characters")
})

type LoginForm = {
  email: string
  password: string
}

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/login', data)
      const token = res.data.token
      const user = res.data.data

      Cookies.set("token", token, { expires: 1, path: "/", sameSite: "Lax" })
      Cookies.set("user", JSON.stringify({ _id: user._id, role: user.role, name: user.name }), {
        expires: 1, path: "/", sameSite: "Lax"
      })

      toast.success("Login successful")
      router.push('/')
    } catch (err: any) {
      console.error(err)
      toast.error(err?.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#309689]/10 backdrop-blur-sm">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white/10 backdrop-blur-md border border-white/20">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-black text-sm mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-3 rounded-xl bg-white/20 text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-[#309689]"
              placeholder="Enter your email"
            />
            <p className="text-red-400 text-sm mt-1">{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-black text-sm mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-3 rounded-xl bg-white/20 text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-[#309689]"
              placeholder="Enter your password"
            />
            <p className="text-red-400 text-sm mt-1">{errors.password?.message}</p>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#309689] hover:bg-[#257166] transition text-white font-semibold shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
