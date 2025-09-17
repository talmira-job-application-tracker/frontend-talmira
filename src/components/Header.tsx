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
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Fetch alerts (kept as your old logic)
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  // Close dropdown when user changes
  useEffect(() => {
    setDropdownOpen(false);
  }, [user]);

  const navigateAndClose = (path: string) => {
    router.push(path);
    setDropdownOpen(false);
    setMenuOpen(false); // close mobile menu if open
  };
  console.log(user?.image,'userimage')

  return (
    <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-black/30 backdrop-blur-md border-b border-white/10">
      {/* Logo */}
      <button onClick={() => router.push("/")} className="flex items-center gap-3 cursor-pointer">
        <img src={"/icons/Group.svg"} alt="Talmira Logo" className="h-8 w-8" />
        <h1 className="text-lg font-semibold text-white hover:text-[#309689] transition-colors">
          TALMIRA
        </h1>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-6 relative" ref={dropdownRef}>
            {/* Alerts */}
            {user.role === "user" && (
              <button
                onClick={() => router.push("/alerts/list")}
                className="relative text-white hover:text-[#309689] transition"
              >
                <Bell size={22} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full px-1 py-0.5">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
            )}

            {/* Profile */}
            <button onClick={() => setDropdownOpen((prev) => !prev)} className="flex items-center">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                <Image
                  src={
                    user.image
                      ? user.image.startsWith("http")
                        ? user.image
                        : `${process.env.NEXT_PUBLIC_BACKEND_URL}${user.image.replace(/\\/g, "/")}`
                      : "/images/noprofile.png"
                  }
                  alt={user.name || "profile picture"}
                  fill
                  className="object-cover rounded-full border-2 border-white hover:border-[#309689] transition"
                  unoptimized
                />
              </div>
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute top-10 right-0 mt-1 w-56 bg-black/50 border border-white/10 rounded-lg shadow-lg flex flex-col p-1">
                <button
                  onClick={() => setDropdownOpen(false)}
                  className="self-end text-white hover:text-red-400 transition mb-2"
                >
                  <X size={18} />
                </button>

                {user.role === "user" && (
                  <>
                    <span
                      onClick={() => navigateAndClose("/profile")}
                      className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#309689] cursor-pointer transition"
                    >
                      <User size={18} /> Profile
                    </span>
                    <span
                      onClick={() => navigateAndClose("/application")}
                      className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#309689] cursor-pointer transition"
                    >
                      <FileText size={18} /> Applications
                    </span>
                    <span
                      onClick={() => navigateAndClose("/subscriptions")}
                      className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#309689] cursor-pointer transition"
                    >
                      <Building2 size={18} /> Subscribed Companies
                    </span>
                  </>
                )}

                {user.role === "admin" && (
                  <span
                    onClick={() => navigateAndClose("/admin/dashboard")}
                    className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#309689] cursor-pointer transition"
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </span>
                )}

                <span
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-500 cursor-pointer transition"
                >
                  <LogOut size={18} /> Logout
                </span>
              </div>
            )}
          </div>
        ) : (
          <>
  <div className="flex gap-4 items-center">
    <button
      onClick={() => router.push("/login")}
      className="px-3 py-1 text-white font-semibold rounded-lg bg-[#309689] hover:bg-[#4fd1c5] transition-colors duration-300"
    >
      Login
    </button>

    <button
      onClick={() => router.push("/register")}
      className="px-3 py-1 text-[#309689] font-semibold rounded-lg bg-white hover:bg-[#e0f7f5] transition-colors duration-300"
    >
      Register
    </button>
  </div>
</>

        )}
      </nav>

      {/* Mobile Hamburger */}
      <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#309689] backdrop-blur-md border-t border-white/10 flex flex-col items-start p-6 gap-4 md:hidden">
          {user?.role === "user" && (
            <>
              <span
                onClick={() => navigateAndClose("/alerts/list")}
                className="flex items-center gap-2 text-white cursor-pointer relative"
              >
                <Bell size={18} /> Alerts
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full px-1 py-0.5">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </span>
              <span onClick={() => navigateAndClose("/application")} className="flex items-center gap-2 text-white cursor-pointer">
                <FileText size={18} /> Applications
              </span>
              <span onClick={() => navigateAndClose("/subscriptions")} className="flex items-center gap-2 text-white cursor-pointer">
                <Building2 size={18} /> Subscribed Companies
              </span>
            </>
          )}

          {user?.role === "admin" && (
            <span onClick={() => navigateAndClose("/admin/dashboard")} className="flex items-center gap-2 text-white cursor-pointer">
              <LayoutDashboard size={18} /> Dashboard
            </span>
          )}

          {!user && (
            <>
              <span onClick={() => navigateAndClose("/login")} className="text-white cursor-pointer">Login</span>
              <span onClick={() => navigateAndClose("/register")} className="text-white cursor-pointer">Register</span>
              <span onClick={() => navigateAndClose("/about-us")} className="text-white cursor-pointer">About Us</span>
              <span onClick={() => navigateAndClose("/contact-us")} className="text-white cursor-pointer">Contact Us</span>
            </>
          )}

          {user && (
            <>
              <span onClick={() => navigateAndClose("/profile")} className="flex items-center gap-2 text-white cursor-pointer">
                <User size={18} /> Profile
              </span>
              <span onClick={() => logout()} className="text-red-400 cursor-pointer">Logout</span>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
