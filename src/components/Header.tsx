
"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Menu,
  X,
  Bell,
  FileText,
  User,
  LogOut,
  Building2,
  LayoutDashboard,
} from "lucide-react";
import Cookies from "js-cookie";
import api from "@/api";

const Header = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token || !user) return;

    api
      .get("/alert/viewallalerts")
      .then((res) => {
        const allAlerts = res.data.data || [];
        const unread = allAlerts.filter((a: any) => !a.isRead).length;
        setUnreadCount(unread);
      })
      .catch((err) => console.error("Failed to fetch alerts", err));
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    setDropdownOpen(false);
  }, [user]);

  return (
    <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-black/20 backdrop-blur-md border-b border-white/10">
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-3 cursor-pointer"
      >
        <img src={"/icons/Group.svg"} alt="Talmira Logo" className="h-8 w-8" />
        <h1 className="text-lg font-semibold text-white hover:text-[#309689] transition-colors">
          TALMIRA
        </h1>
      </button>

      <nav className="hidden md:flex items-center gap-6">
        {user?.role === "user" && (
          <span
            onClick={() => router.push("/alerts/list")}
            className="relative flex items-center text-white cursor-pointer"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full px-1 ">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </span>
        )}

        {user ? (
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center text-white hover:text-[#309689] cursor-pointer transition"
            >
              <Menu size={22} />
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-black/50 border border-white/10 rounded-lg shadow-lg flex flex-col p-2">
                {/* Close button inside dropdown */}
                <button
                  onClick={() => setDropdownOpen(false)}
                  className="self-end text-white hover:text-red-400 transition mb-2"
                >
                  <X size={18} />
                </button>

                {user?.role === "user" && (
                  <>
                    <span
                      onClick={() => router.push("/application")}
                      className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#309689] cursor-pointer transition"
                    >
                      <FileText size={18} /> Applications
                    </span>
                    <span
                      onClick={() => router.push("/subscriptions")}
                      className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#309689] cursor-pointer transition"
                    >
                      <Building2 size={18} /> Subscribed Companies
                    </span>
                  </>
                )}

                {user?.role === "admin" && (
                  <span
                    onClick={() => router.push("/admin/dashboard")}
                    className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#309689] cursor-pointer transition"
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </span>
                )}

                <span
                  onClick={() => router.push("/profile")}
                  className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#309689] cursor-pointer transition"
                >
                  <User size={18} /> Profile
                </span>
                <span
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-500 cursor-pointer transition"
                >
                  <LogOut size={18} /> Logout
                </span>
              </div>
            )}
          </div>
        ) : (
          <>
            <span
              onClick={() => router.push("/login")}
              className="text-white hover:text-[#309689] cursor-pointer transition"
            >
              Login
            </span>
            <span
              onClick={() => router.push("/register")}
              className="text-white hover:text-[#309689] cursor-pointer transition"
            >
              Register
            </span>
            <span
              onClick={() => router.push("/about-us")}
              className="text-white hover:text-[#309689] cursor-pointer transition"
            >
              About Us
            </span>
            <span
              onClick={() => router.push("/contact-us")}
              className="text-white hover:text-[#309689] cursor-pointer transition"
            >
              Contact Us
            </span>
          </>
        )}
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#309689] backdrop-blur-md border-t border-white/10 flex flex-col items-start p-6 gap-4 md:hidden">
          {user?.role === "user" && (
            <>
              <span
                onClick={() => router.push("/alerts/list")}
                className="flex items-center gap-2 text-white cursor-pointer relative"
              >
                <Bell size={18} /> Alerts
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full px-1 py-0.5">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </span>
              <span
                onClick={() => router.push("/application")}
                className="flex items-center gap-2 text-white cursor-pointer"
              >
                <FileText size={18} /> Applications
              </span>
              <span
                onClick={() => router.push("/subscriptions")}
                className="flex items-center gap-2 text-white cursor-pointer"
              >
                <Building2 size={18} /> Subscribed Companies
              </span>
            </>
          )}
          {user?.role === "admin" && (
            <span
              onClick={() => router.push("/admin/dashboard")}
              className="flex items-center gap-2 text-white cursor-pointer"
            >
              <LayoutDashboard size={18} /> Dashboard
            </span>
          )}

          {!user && (
            <>
             <span
                onClick={() => router.push("/login")}
                className="text-white cursor-pointer"
              >
                Login
              </span>
              <span
                onClick={() => router.push("/register")}
                className="text-white cursor-pointer"
              >
                Register
              </span>
              <span
                onClick={() => router.push("/about-us")}
                className="text-white cursor-pointer"
              >
                About Us
              </span>
              <span
                onClick={() => router.push("/contact-us")}
                className="text-white cursor-pointer"
              >
                Contact Us
              </span>
              
            </>
          )}

          {user && (
            <>
              <span
                onClick={() => router.push("/profile")}
                className="flex items-center gap-2 text-white cursor-pointer"
              >
                <User size={18} /> Profile
              </span>
              <span onClick={logout} className="text-red-400 cursor-pointer">
                Logout
              </span>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
