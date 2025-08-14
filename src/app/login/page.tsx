"use client"
import api from '@/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup'
import Cookies from "js-cookie"


const schema = yup.object().shape({
    email: yup.string().required("Enter your email").email("Invalid email format"),
    password: yup.string().required("Password is required").min(6, "Must e at least 6 characters")
});

type LoginForm = {
    email: string;
    password: string; 
};

const LoginPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }} = useForm<LoginForm>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: LoginForm) => {
        setLoading(true);
        try{
            const res = await api.post('/auth/login', data);
            const token = res.data.token;
            const user = res.data.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            Cookies.set("token", token, {
                expires: 1, // days
                path: "/",
                sameSite: "Lax",
            });

            Cookies.set("user", JSON.stringify(user), {
                expires: 1,
                path: "/",
                sameSite: "Lax",
            });

            toast.success("login success")

            router.push('/books');
        }catch (err: any){
            console.error(err);
            toast.error(err?.response?.data?.message || "login failed")
        } finally {
        setLoading(false);
        }
    };

    return (
        <div>
        <h2 className="text-center text-3xl font-bold text-[#5c4433] mb-6">Login to Your Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-[#5c4433] mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 rounded-lg bg-white/80 text-[#5c4433] focus:outline-none focus:ring-2 focus:ring-[#8b6e5c]"
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5c4433] mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 rounded-lg bg-white/80 text-[#5c4433] focus:outline-none focus:ring-2 focus:ring-[#8b6e5c]"
            />
            <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-full text-white font-semibold transition duration-300"
            style={{
              backgroundColor: '#8b6e5c',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5c4433')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#8b6e5c')}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        </div>
    )
}