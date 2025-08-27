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
    router.push("/");
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-gray-100 border-b border-gray-300">
      {/* Left Section: Logo */}
      <h1
        className="text-lg font-semibold cursor-pointer"
        onClick={() => router.push("/")}
      >
        JobTracker
      </h1>

      {/* Right Section: Buttons */}
      <div className="flex items-center gap-4">
        {!token ? (
          <>
            <button
              className="px-3 py-1 rounded bg-blue-500 text-white"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
            <button
              className="px-3 py-1 rounded bg-green-500 text-white"
              onClick={() => router.push("/register")}
            >
              Register
            </button>
          </>
        ) : (
          <>
            {/* Notifications: ONLY visible if role is "user" */}
            {role === "user" && (
              <button
                className="p-2 rounded hover:bg-gray-200"
                onClick={() => router.push("/alerts/list")}
              >
                <Bell className="w-5 h-5" />
              </button>
            )}

            {/* Role-based Actions */}
            {role === "admin" && (
              <div className="flex gap-3">
                <button
                  className="px-3 py-1 rounded bg-gray-700 text-white"
                  onClick={() => router.push("/application")}
                >
                  Applications
                </button>
                <button
                  className="px-3 py-1 rounded bg-gray-700 text-white"
                  onClick={() => router.push("/job")}
                >
                  Jobs
                </button>
                <button
                  className="px-3 py-1 rounded bg-gray-700 text-white"
                  onClick={() => router.push("/company")}
                >
                  Companies
                </button>
              </div>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded bg-red-500 text-white"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
