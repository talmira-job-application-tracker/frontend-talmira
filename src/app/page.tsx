"use client";

import ListCompanies from "@/components/ListCompany";
import ListJob from "@/components/ListJob";
import AddCompany from "./company/add/page";
import ListUsers from "@/components/ListUsers";
import JobSearch from "@/components/JobSearchBar";
import NotificationToggleButton from "@/components/ToggleNotification";
import ListApplications from "@/components/ListApplications";
import CompanySearch from "@/components/CompanySearch";
import LoginPage from "./login/page";
import Header from "@/components/Header";
import SubscribedCompanies from "@/components/ListSubscribedCompanies";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import ListAlerts from "./alerts/list/page";
import AutoSlider from "@/components/Banner";
import HomePage from "@/components/HomePage";
import { useRouter } from "next/navigation";

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
    <div className='flex flex-col justify-items-start gap-10 mt-15'>
      <Header />

      {!token && <AutoSlider />}

      {token && !isAdmin && <HomePage />}

      {/* <LoginPage/> */}
      {/* <AddCompany/> */}
      {/* <ListCompanies/> */}
      {/* <ListJob/> */}
      {/* <ListUsers/> */}
      {/* <ListCompanies/> */}
      {/* <ListJob/> */}
      {/* <ListUsers/> */}
      {/* <JobSearch/> */}
      {/* <NotificationToggleButton/> */}
      {/* {/* <ListApplications/> */}
      {/* <SubscribedCompanies/>  */}
      {/* <CompanySearch/> */}
      {/* <JobSearch/> */}
      {/* <JobSearch/> */}
      {/* <NotificationToggleButton/> */}
      {/* <ListAlerts/> */}
      {/* <Footer/> */}

      <Footer />
    </div>
  );
}
