"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react"; // notification icon

import CompanySearch from "./CompanySearch";
import ListApplications from "./ListApplications";
import JobSearch from "./JobSearchBar";

const Header = () => {
  const [token, setToken] = useState<string | undefined>();
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const t = Cookies.get("token");
    setToken(t);

    const storedRole = Cookies.get("role");
    if (storedRole) setRole(storedRole);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    setToken(undefined);
    setRole(null);
    router.push("/login");
  };

  return (
    <header className="w-full flex items-center justify-between bg-white shadow px-6 py-3">
      {/* Logo / App name */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        JobTracker
      </h1>

      <nav className="flex items-center gap-4">
        {!token ? (
          <>
            <button
              onClick={() => router.push("/login")}
              className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/register")}
              className="px-3 py-1 rounded border border-blue-500 text-blue-500 hover:bg-blue-50"
            >
              Register
            </button>
          </>
        ) : role === "user" ? (
          <>
            <JobSearch />
            <button
              onClick={() => router.push("/alerts/list")}
              className="p-2 rounded hover:bg-gray-100"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>
            <ListApplications />
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : role === "admin" ? (
          <>
            <button
              onClick={() => router.push("/applications")}
              className="px-3 py-1 rounded hover:bg-gray-100"
            >
              Applications
            </button>
            <button
              onClick={() => router.push("/jobs")}
              className="px-3 py-1 rounded hover:bg-gray-100"
            >
              Jobs
            </button>
            <button
              onClick={() => router.push("/companies")}
              className="px-3 py-1 rounded hover:bg-gray-100"
            >
              Companies
            </button>
            <CompanySearch />
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
