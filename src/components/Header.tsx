"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Bell } from "lucide-react";

const Header = () => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("token") || null;
    const user = JSON.parse(Cookies.get("user") || "{}");

    setToken(storedToken);
    setRole(user?.role || null);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken(null);
    setRole(null);
    router.push("/")
  };

return (
  <header className="absolute top-0 left-0 w-full z-50 
  flex items-center justify-between px-6 py-3 
  bg-black/20 backdrop-blur-md border-b border-white/10">
    
    {/* Left: Logo */}
    <a className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
      <img src={'/icons/Group.svg'} alt="Talmira Logo" className="h-8 w-8" />
      <h1 className="text-lg font-semibold text-white hover:text-[#309689] transition-colors">
        TALMIRA
      </h1>
    </a>

    {/* Center: Navigation */}
    <nav className="flex gap-6">
      {/* {role === "admin" && (
        <>
          <span
            className="text-white hover:text-[#309689] hover:font-semibold cursor-pointer transition"
            onClick={() => router.push("/application")}
          >
            Applications
          </span>
          <span
            className="text-white hover:text-[#309689] hover:font-semibold cursor-pointer transition"
            onClick={() => router.push("/job")}
          >
            Jobs
          </span>
          <span
            className="text-white hover:text-[#309689] hover:font-semibold cursor-pointer transition"
            onClick={() => router.push("/company")}
          >
            Companies
          </span>
        </>
      )} */}

      {role === "user" && (
      <>
        <span
          className="text-white hover:text-[#309689] hover:font-semibold cursor-pointer transition"
          onClick={() => router.push("/alerts/list")}
        >
          Alerts
        </span>
        <span
          className="text-white hover:text-[#309689] hover:font-semibold cursor-pointer transition"
          onClick={() => router.push("/application")}
        >
          Applications
        </span>
      </>
      )}
    </nav>

    {/* Right: Auth */}
    <div className="flex items-center gap-4">
      {!token ? (
        <>
          <span
            className="text-white hover:text-[#309689] hover:font-semibold cursor-pointer transition"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
          <span
            className="text-white hover:text-[#309689] hover:font-semibold cursor-pointer transition"
            onClick={() => router.push("/register")}
          >
            Register
          </span>
        </>
      ) : (
        <>
        <span
          className="text-white hover:text-[#309689] hover:font-semibold cursor-pointer transition"
          onClick={() => router.push("/profile")}
        >
          Profile
        </span>
        <span
          onClick={handleLogout}
          className="text-white hover:text-red-400 hover:font-semibold cursor-pointer transition"
        >
          Logout
        </span>
        </>
      )}
    </div>
  </header>
)

};

export default Header;
