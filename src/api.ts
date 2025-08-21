import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
    withCredentials: true, 
});

api.interceptors.request.use((config) => {
    // const token = localStorage.getItem('token');
    const token = Cookies.get("token");
    if (token)config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api