"use client"
import api from '@/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup'
import Cookies from "js-cookie"
import { useRouter } from 'next/navigation';


const schema = yup.object().shape({
    email: yup.string().required("Enter your email").email("Invalid email format"),
    password: yup.string().required("Password is required").min(6, "Must e at least 6 characters")
});

type LoginForm = {
    email: string;
    password: string; 
};

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }} = useForm<LoginForm>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: LoginForm) => {
        setLoading(true);
        try{
            const res = await api.post('/auth/login', data);
            const token = res.data.token;
            const user = res.data.data;

            // localStorage.setItem('token', token);
            // localStorage.setItem('user', JSON.stringify(user));

            Cookies.set("token", token, {
                expires: 1, 
                path: "/",
                sameSite: "Lax",
            });

            Cookies.set("user", JSON.stringify({ _id: user._id, role: user.role, name: user.name }), {
                expires: 1,
                path: "/",
                sameSite: "Lax",
            });
            toast.success("login success")
            router.push('/');

        }catch (err: any){
            console.error(err);
            toast.error(err?.response?.data?.message || "login failed")
        } finally {
        setLoading(false);
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)} >

          <div>
            <label>Email</label>
            <input
              type="email"
              {...register("email")}
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              {...register("password")}
            />
            <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        </div>
    )
}

export default LoginPage;