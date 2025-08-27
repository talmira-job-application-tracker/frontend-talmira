'use client'

import { CompanyType } from "@/types/companyType"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import api from "@/api"
import Link from "next/link"

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

  if (loading) return <p>Loading...</p>

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-xl font-semibold mb-4">Subscribed Companies</h1>

      {companies.length > 0 ? (
        companies.map((c) => (
          <Link 
            key={c._id} 
            href={`/company/${c._id}`}   
          >
            <div className="border rounded-md p-3 shadow-sm hover:shadow-md transition cursor-pointer">
              <p><span className="font-semibold">Name:</span> {c.name}</p>
              <p><span className="font-semibold">Location:</span> {c.location}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No subscribed companies found.</p>
      )}
    </div>
  )
}

export default SubscribedCompanies
