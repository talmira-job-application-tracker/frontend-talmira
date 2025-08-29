"use client"

import api from "@/api"
import { CompanyType } from "@/types/companyType"
import { useState, useEffect } from "react"
import Link from "next/link"
import { FiSearch } from "react-icons/fi"
import { Loader2 } from "lucide-react"

const CompanySearch = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<CompanyType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchCompanies = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await api.get(`/company/list?query=${encodeURIComponent(searchQuery)}`)
      setResults(res.data.data || [])
    } catch (err: any) {
      console.error("Error fetching companies:", err)
      setError(err.response?.data?.message || "Failed to fetch companies")
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        fetchCompanies(query)
      } else {
        setResults([])
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="p-6 space-y-6">
      {/* Search Input */}
      <div className="relative w-full max-w-lg">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search companies by name, industry, or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 shadow-sm 
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-sans"
        />
        {loading && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-indigo-500" size={18} />}
      </div>

      {/* Error */}
      {error && <p className="text-red-600 font-medium">{error}</p>}

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.length > 0 ? (
          results.map((company) => {
            const logoPath = company.logo?.replace(/\\/g, "/")
            const logoUrl = logoPath
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${logoPath?.startsWith("/") ? "" : "/"}${logoPath}`
              : null

            return (
              <Link key={company._id} href={`/company/${company._id}`}>
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl 
                                shadow-md hover:shadow-lg hover:scale-[1.02] transition-all p-5 cursor-pointer flex flex-col gap-3">
                  {logoUrl && (
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img
                        src={logoUrl}
                        alt={company.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-lg text-gray-900">{company.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{company.description}</p>
                </div>
              </Link>
            )
          })
        ) : (
          query.trim() && !loading && <p className="text-gray-500">No companies found.</p>
        )}
      </div>
    </div>
  )
}

export default CompanySearch
