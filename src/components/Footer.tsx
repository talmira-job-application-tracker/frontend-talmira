'use client'

import { Github, Linkedin, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 text-gray-200 py-5 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
        
        <div className="text-center md:text-left px-6 md:px-12">
          <h2 className="text-xl font-bold text-[#309689] tracking-wide">Talmira</h2>
          <p className="text-sm text-gray mt-1">
            &copy; {year || '...'} Talmira. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium px-6 md:px-12">
          <a href="/" className="text-gray hover:text-[#26786f] transition">Home</a>
          <a href="/about-us" className="text-gray hover:text-[#26786f] transition">About</a>
          <a href="/contact-us" className="text-gray hover:text-[#26786f] transition">Contact</a>
        </div>

        <div className="text-gray flex space-x-5 px-6 md:px-12">
          <a href="https://twitter.com" target="_blank" className="hover:text-[#26786f] transition">
            <Twitter size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" className="hover:text-[#26786f] transition">
            <Linkedin size={20} />
          </a>
          <a href="https://github.com" target="_blank" className="hover:text-[#26786f] transition">
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
