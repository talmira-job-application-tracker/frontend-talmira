"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  Menu,
  X,
  Bell,
  FileText,
  User,
  LogOut,
  LogIn,
  UserPlus,
  Building2,
  LayoutDashboard,
} from "lucide-react";

const Header = () => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedToken = Cookies.get("token") || null;
    const user = JSON.parse(Cookies.get("user") || "{}");
    setToken(storedToken);
    setRole(user?.role || null);
  }, []);

  // Close dropdown on outside click
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
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken(null);
    setRole(null);
    router.push("/");
  };

  return (
    <header
      className="absolute top-0 left-0 w-full z-50 
      flex items-center justify-between px-6 py-3 
      bg-black/20 backdrop-blur-md border-b border-white/10"
    >
      <a
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <img src={"/icons/Group.svg"} alt="Talmira Logo" className="h-8 w-8" />
        <h1 className="text-lg font-semibold text-white hover:text-[#309689] transition-colors">
          TALMIRA
        </h1>
      </a>

      <nav className="hidden md:flex items-center gap-6">
        {role === "user" && (
          <span
            className="flex items-center text-white hover:text-[#309689] cursor-pointer transition"
            onClick={() => router.push("/alerts/list")}
          >
            <Bell size={18} />
          </span>
        )}

        {/* Show About Us + Contact Us ONLY when logged out */}
        {!token && (
          <>
            <span
              className="text-white hover:text-[#309689] cursor-pointer transition"
              onClick={() => router.push("/about-us")}
            >
              About Us
            </span>
            <span
              className="text-white hover:text-[#309689] cursor-pointer transition"
              onClick={() => router.push("/contact-us")}
            >
              Contact Us
            </span>
          </>
        )}

        {!token ? (
          <>
            <span
              className="text-white hover:text-[#309689] cursor-pointer transition"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
            <span
              className="text-white hover:text-[#309689] cursor-pointer transition"
              onClick={() => router.push("/register")}
            >
              Register
            </span>
          </>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center text-white hover:text-[#309689] cursor-pointer transition"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Menu size={22} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-black/50 border border-white/10 rounded-lg shadow-lg flex flex-col p-2">
                <span
                  className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#309689] cursor-pointer transition"
                  onClick={() => {
                    router.push("/profile");
                    setDropdownOpen(false);
                  }}
                >
                  <User size={18} /> Profile
                </span>
                {role === "user" && (
                  <>
                    <span
                      className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#309689] cursor-pointer transition"
                      onClick={() => {
                        router.push("/application");
                        setDropdownOpen(false);
                      }}
                    >
                      <FileText size={18} /> Applications
                    </span>
                    <span
                      className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#309689] cursor-pointer transition"
                      onClick={() => {
                        router.push("/subscriptions");
                        setDropdownOpen(false);
                      }}
                    >
                      <Building2 size={18} /> Subscribed Companies
                    </span>
                  </>
                )}
                {role === "admin" && (
                  <span
                    className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#309689] cursor-pointer transition"
                    onClick={() => {
                      router.push("/admin/dashboard");
                      setDropdownOpen(false);
                    }}
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </span>
                )}
                <span
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-500 cursor-pointer transition"
                >
                  <LogOut size={18} /> Logout
                </span>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#309689] backdrop-blur-md border-t border-white/10 flex flex-col items-start p-6 gap-4 md:hidden">
          {role === "user" && (
            <>
              <span
                className="flex items-center text-white hover:text-[#309689] cursor-pointer transition"
                onClick={() => {
                  router.push("/alerts/list");
                  setMenuOpen(false);
                }}
              >
                <Bell size={18} />
              </span>
              <span
                className="flex items-center gap-2 text-white hover:text-[#309689] cursor-pointer transition"
                onClick={() => {
                  router.push("/application");
                  setMenuOpen(false);
                }}
              >
                <FileText size={18} /> Applications
              </span>
              <span
                className="flex items-center gap-2 text-white hover:text-[#309689] cursor-pointer transition"
                onClick={() => {
                  router.push("/subscriptions");
                  setMenuOpen(false);
                }}
              >
                <Building2 size={18} /> Subscribed Companies
              </span>
            </>
          )}

          {role === "admin" && (
            <span
              className="flex items-center gap-2 text-white hover:text-[#309689] cursor-pointer transition"
              onClick={() => {
                router.push("hboard");
                setMenuOpen(false);
              }}
            >
              <LayoutDashboard size={18} /> Dashboard
            </span>
          )}

          {/* About/Contact for logged-out mobile */}
          {!token && (
            <>
              <span
                className="text-white hover:text-[#309689] cursor-pointer transition"
                onClick={() => {
                  router.push("/about-us");
                  setMenuOpen(false);
                }}
              >
                About Us
              </span>
              <span
                className="text-white hover:text-[#309689] cursor-pointer transition"
                onClick={() => {
                  router.push("/contact-us");
                  setMenuOpen(false);
                }}
              >
                Contact Us
              </span>
            </>
          )}

          <span
            className="flex items-center gap-2 text-white hover:text-[#309689] cursor-pointer transition"
            onClick={() => {
              router.push("/profile");
              setMenuOpen(false);
            }}
          >
            <User size={18} /> Profile
          </span>

          {!token ? (
            <>
              <span
                className="text-white hover:text-[#309689] cursor-pointer transition"
                onClick={() => {
                  router.push("/login");
                  setMenuOpen(false);
                }}
              >
                Login
              </span>
              <span
                className="text-white hover:text-[#309689] cursor-pointer transition"
                onClick={() => {
                  router.push("/register");
                  setMenuOpen(false);
                }}
              >
                Register
              </span>
            </>
          ) : (
            <span
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-red-400 hover:text-red-500 cursor-pointer transition"
            >
              Logout
            </span>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
