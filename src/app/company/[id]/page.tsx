'use client'

import api from "@/api"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const viewCompany = () => {
  const { id } = useParams()
  const [company, setCompany] = useState<any>(null)

  useEffect(() => {
    if (!id) return;

    api.get(`/company/view/${id}`)
      .then((res) => {
        setCompany(res.data.data)
      })
      .catch((err) => {
        console.error(err)
      })

  }, [id])

  if (!company) {
    return <p>Loading...</p>
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{company.name}</h2>
      <p><strong>Location:</strong> {company.location}</p>
      <p><strong>Industry:</strong> {company.industry}</p>
    </div>
  )
}

export default viewCompany
