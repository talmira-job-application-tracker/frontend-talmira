"use client"

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
import Cookies from 'js-cookie'
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import ListAlerts from "./alerts/list/page";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

 useEffect(() => {
    const t = Cookies.get("token");
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;

    setToken(t || null);
    setIsAdmin(user?.role === "admin");
  }, []);

  return (
    <div>
      <Header/>

      <div className="flex-1 flex justify-center">
        {token && (
          isAdmin ? <CompanySearch/> : <JobSearch/>
        )}
      </div>
      {/* <LoginPage/> */}
      {/* <AddCompany/> */}
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
      <ListAlerts/>
            <Footer/>

    </div>
  );
}
