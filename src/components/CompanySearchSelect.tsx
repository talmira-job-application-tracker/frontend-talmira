"use client";

import { CompanyType } from "@/types/companyType";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface CompanySearchSelectProps {
  onCompanySelect: (company: CompanyType | null) => void;
  selectedCompany: CompanyType | null;
}

const CompanySearchSelect = ({ onCompanySelect, selectedCompany }: CompanySearchSelectProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CompanyType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchCompanies = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError("");

    fetch(`/api/company/list?query=${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then((data) => setResults(data.data || []))
      .catch((err) => {
        console.error("Error fetching companies:", err);
        setError("Failed to fetch companies");
        setResults([]);
      })
      .finally(() => setLoading(false));
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        fetchCompanies(query);
        setIsDropdownOpen(true);
      } else {
        setResults([]);
        setIsDropdownOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCompany = (company: CompanyType) => {
    onCompanySelect(company);
    setQuery("");
    setIsDropdownOpen(false);
    setResults([]);
  };

  const handleClearSelection = () => {
    onCompanySelect(null);
    setQuery("");
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {selectedCompany ? (
        <div className="flex items-center justify-between p-3 bg-white/20 border border-white/30 rounded-lg">
          <div className="flex items-center gap-3">
            {selectedCompany.logo && (
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${selectedCompany.logo}`}
                alt={selectedCompany.name}
                width={32} // w-8
                height={32} // h-8
                className="rounded-full object-contain border"
                unoptimized
              />
            )}
            <span className="font-medium text-[#07332f]">{selectedCompany.name}</span>
          </div>
          <button
            type="button"
            onClick={handleClearSelection}
            className="text-red-500 hover:text-red-700"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a company..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 bg-white/20 text-[#07332f] placeholder-[#07332f]/70 border border-white/30 focus:ring-2 focus:ring-[#309689] outline-none rounded-lg transition"
          />
          <button
            type="button"
            onClick={() => query && fetchCompanies(query)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#309689] hover:text-[#26776d]"
          >
            <Search size={18} />
          </button>
        </div>
      )}

      {isDropdownOpen && query.trim() && (
        <div className="absolute mt-1 w-full bg-white/95 rounded-lg shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
          {loading && (
            <p className="px-4 py-2 text-gray-500 text-sm animate-pulse">Searching...</p>
          )}

          {!loading && results.length > 0 ? (
            results.map((company) => {
              const logoPath = company.logo?.replace(/\\/g, "/");
              const logoUrl = logoPath
                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${logoPath?.startsWith("/") ? "" : "/"}${logoPath}`
                : null;

              return (
                <button
                  key={company._id}
                  type="button"
                  onClick={() => handleSelectCompany(company)}
                  className="w-full text-left flex items-center gap-3 px-4 py-2 hover:bg-[#309689]/10 cursor-pointer transition"
                >
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={company.name}
                      className="w-8 h-8 rounded-full object-contain border"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                      N/A
                    </div>
                  )}
                  <p className="font-medium text-gray-800 text-sm sm:text-base">{company.name}</p>
                </button>
              );
            })
          ) : (
            !loading && query && (
              <p className="px-4 py-2 text-gray-500 text-sm">No companies found.</p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default CompanySearchSelect;