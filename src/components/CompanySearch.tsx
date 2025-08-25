"use client";

import api from "@/api";
import { CompanyType } from "@/types/companyType";
import { useState } from "react";

const CompanySearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CompanyType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]); // do not fetch all companies
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.get(`/company/list?query=${encodeURIComponent(query)}`);
      setResults(res.data.data || []);
    } catch (err: any) {
      console.error("Error fetching companies:", err);
      setError(err.response?.data?.message || "Failed to fetch companies");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuery("");
    setResults([]);
    setError("");
  };

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
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading companies...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.length > 0 ? (
          results.map((company) => {
            const logoPath = company.logo?.replace(/\\/g, "/");
            const logoUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${logoPath?.startsWith("/") ? "" : "/"}${logoPath}`;

            return (
              <div
                key={company._id}
                className="border p-4 rounded shadow-sm hover:shadow-md transition"
              >
                {company.logo && (
                  <img
                    src={logoUrl}
                    alt={company.name}
                    width={100}
                    height={100}
                    className="mb-2"
                  />
                )}
                <h3 className="font-semibold">{company.name}</h3>
                <p>{company.description}</p>
              </div>
            );
          })
        ) : (
          query.trim() && <p>No companies found.</p>
        )}
      </div>
    </div>
  );
};

export default CompanySearch;
