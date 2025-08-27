"use client";

import api from "@/api";
import { CompanyType } from "@/types/companyType";
import { useState, useEffect } from "react";
import Link from "next/link";

const CompanySearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CompanyType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCompanies = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.get(`/company/list?query=${encodeURIComponent(searchQuery)}`);
      setResults(res.data.data || []);
    } catch (err: any) {
      console.error("Error fetching companies:", err);
      setError(err.response?.data?.message || "Failed to fetch companies");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        fetchCompanies(query);
      } else {
        setResults([]);
      }
    }, 500); // half-second delay after typing

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="p-4 space-y-4">
      {/* Search input */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search companies by name, industry, or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-80"
        />
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading companies...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.length > 0 ? (
          results.map((company) => {
            const logoPath = company.logo?.replace(/\\/g, "/");
            const logoUrl = logoPath
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${logoPath?.startsWith("/") ? "" : "/"}${logoPath}`
              : null;

            return (
              <Link key={company._id} href={`/company/${company._id}`}>
                <div className="border p-4 rounded shadow-sm hover:shadow-md transition cursor-pointer">
                  {logoUrl && (
                    <img
                      src={logoUrl}
                      alt={company.name}
                      width={100}
                      height={100}
                      className="mb-2"
                    />
                  )}
                  <h3 className="font-semibold">{company.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{company.description}</p>
                </div>
              </Link>
            );
          })
        ) : (
          query.trim() && !loading && <p>No companies found.</p>
        )}
      </div>
    </div>
  );
};

export default CompanySearch;
