'use client'

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import api from "@/api"
import Link from "next/link"
import { AlertType } from "@/types/alertsType"
import { FiTrash2 } from "react-icons/fi" 

const ListAlerts = () => {
  const [alerts, setAlerts] = useState<AlertType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchAlerts = () => {
    const token = Cookies.get('token')
    if (!token) return

    setLoading(true)
    api.get('/alert/viewallalerts')
      .then((res) => setAlerts(res.data.data || []))
      .catch((err) => {
        console.error(err)
        setError("Failed to fetch alerts")
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchAlerts()
  }, [])

  const handleDelete = (alertId: string) => {
    api.delete(`/alert/delete/${alertId}`)
      .then(() => {
        setAlerts((prev) => prev.filter((a) => a._id !== alertId))
      })
      .catch((err) => {
        console.error(err)
        setError("Failed to delete alert")
      })
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Your Alerts</h2>

      {loading && <p>Loading alerts...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {alerts.length > 0 ? (
        <ul className="space-y-2">
          {alerts.map((a) => (
            <li key={a._id} className="relative group">
              <Link
                href={a.jobId ? `/job/${a.jobId._id}` : '#'}
                className="block"
              >
                <div
                  className={`p-3 border rounded-md shadow-sm hover:shadow-md transition cursor-pointer
                    ${a.isRead ? "bg-gray-100" : "bg-black font-semibold"}`}
                >
                  <p>{a.message}</p>
                  {a.jobId && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {a.jobId.title} | {a.jobId.location} | {a.jobId.jobType} | {a.jobId.workMode}
                    </p>
                  )}
                </div>
              </Link>
              <button
                onClick={() => handleDelete(a._id)}
                className="absolute top-6 right-3 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition"
                title="Delete alert"
              >
                <FiTrash2 size={22}/>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No alerts found</p>
      )}
    </div>
  )
}

export default ListAlerts
