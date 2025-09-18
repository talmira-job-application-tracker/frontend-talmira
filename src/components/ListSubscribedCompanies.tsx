'use client'

import { CompanyType } from "@/types/companyType"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import api from "@/api"
import Link from "next/link"
import { Building2, Loader2 } from "lucide-react"

const SubscribedCompanies = () => {
  const [companies, setCompanies] = useState<CompanyType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = Cookies.get("token")
    if (!token) return

    setLoading(true)
    api.get('/subscription/subs-companies')
      .then((res) => {
        setCompanies(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#309689]" size={32} />
        <span className="ml-2 text-gray-600">Loading your subscriptions...</span>
      </div>
    )
  }

  return (
    <div className="py-30 max-w-6xl mx-auto">

      {companies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((c) => (
            <Link 
              key={c._id} 
              href={`/company/${c._id}`} 
              className="block"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 
                              rounded-xl shadow-sm hover:shadow-md transition 
                              p-5 h-full flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="text-[#309689]" size={24} />
                  <p className="text-lg font-semibold text-gray-800">{c.name}</p>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Location:</span> {c.location || "Not specified"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-64 text-center space-y-3 bg-gradient-to-r from-teal-700 to-teal-500 rounded-xl shadow-lg p-6 relative overflow-hidden">
          <Building2 size={50} className="text-white animate-bounce" />
          <p className="text-white text-lg font-semibold">
            You haven’t subscribed to any companies yet!
          </p>
          <p className="text-teal-100 text-sm max-w-xs">
            Subscribe to companies to receive alerts for new job postings and stay ahead in your job search.
          </p>
        </div>
      )}
    </div>
  )
}

export default SubscribedCompanies
