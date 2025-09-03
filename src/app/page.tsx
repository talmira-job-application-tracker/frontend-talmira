"use client";

import Header from "@/components/Header";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import AutoSlider from "@/components/Banner";
import HomePage from "@/components/HomePage";
import { useRouter } from "next/navigation";
import AboutUs from "./about-us/page";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = Cookies.get("token");
    console.log(t, 'token...')
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;

    setToken(t || null);
    setIsAdmin(user?.role === "admin");

    if (t && user?.role === "admin") {
      router.push("/admin/dashboard");
    }
  }, [router]);

  return (
    <div className='flex flex-col justify-items-start'>
      {/* <Header /> */}

      {!token && 
      <>
      <AutoSlider /> 
      <AboutUs/>
      </>
      }

      {token && !isAdmin && <HomePage />}

      <Footer />
    </div>
  );
}
