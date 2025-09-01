"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Menu, X, Bell, FileText, User, LogOut, LogIn, UserPlus } from "lucide-react";

const Header = () => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const NavLinks = () => (
    <>
      {role === "user" && (
        <>
          <span
            className="flex items-center gap-2 text-white hover:text-[#309689] cursor-pointer transition"
            onClick={() => {
              router.push("/alerts/list");
              setMenuOpen(false);
            }}
          >
            <Bell size={18} /> Alerts
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
        </>
      )}

      {!token ? (
        <>
          <span
            className="flex items-center gap-2 text-white hover:text-[#309689] cursor-pointer transition"
            onClick={() => {
              router.push("/login");
              setMenuOpen(false);
            }}
          >
            <LogIn size={18} /> Login
          </span>
          <span
            className="flex items-center gap-2 text-white hover:text-[#309689] cursor-pointer transition"
            onClick={() => {
              router.push("/register");
              setMenuOpen(false);
            }}
          >
            <UserPlus size={18} /> Register
          </span>
        </>
      ) : (
        <>
          <span
            className="flex items-center gap-2 text-white hover:text-[#309689] cursor-pointer transition"
            onClick={() => {
              router.push("/profile");
              setMenuOpen(false);
            }}
          >
            <User size={18} /> Profile
          </span>
          <span
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 text-white hover:text-red-400 cursor-pointer transition"
          >
            <LogOut size={18} /> Logout
          </span>
        </>
      )}
    </>
  );

  return (
    <header className="absolute top-0 left-0 w-full z-50 
      flex items-center justify-between px-6 py-3 
      bg-black/20 backdrop-blur-md border-b border-white/10">
      
      {/* Logo */}
      <a
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <img src={"/icons/Group.svg"} alt="Talmira Logo" className="h-8 w-8" />
        <h1 className="text-lg font-semibold text-white hover:text-[#309689] transition-colors">
          TALMIRA
        </h1>
      </a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6">
        <NavLinks />
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
        <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md border-t border-white/10 flex flex-col items-start p-6 gap-4 md:hidden">
          <NavLinks />
        </div>
      )}
    </header>
  );
};

export default Header;
