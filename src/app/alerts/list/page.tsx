
'use client'

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import api from "@/api"
import Link from "next/link"
import { AlertType } from "@/types/alertsType"
import { FiTrash2, FiBell } from "react-icons/fi"
import Header from "@/components/Header"

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

  const markAsRead = async (alert: AlertType) => {
    if (alert.isRead) return
    try {
      await api.post(`/alert/${alert._id}/read`)
      setAlerts((prev) =>
        prev.map(a =>
          a._id === alert._id ? { ...a, isRead: true } : a
        )
      )
    } catch (err) {
      console.error("Failed to mark alert as read", err)
    }
  }

  return (
    <div className="min-h-screen w-full p-4 sm:p-6 md:p-8 ">
      <div className="mt-11 w-full max-w-4xl mx-auto flex flex-col gap-4 px-2 sm:px-4">
        {loading && <p className="text-gray-600 text-center">Loading alerts...</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {alerts.length > 0 ? (
          <ul className="space-y-4">
            {alerts.map((alert) => (
              <li key={alert._id} className="relative group w-full">
                <Link
                  href={alert.jobId ? `/job/${alert.jobId._id}` : '#'}
                  className="block w-full"
                  onClick={async (e) => {
                    if (!alert.isRead) {
                      e.preventDefault()
                      await markAsRead(alert)
                      if (alert.jobId) window.location.href = `/job/${alert.jobId._id}`
                    }
                  }}
                >
                  <div
                    className={`relative w-full p-4 sm:p-5 border rounded-xl shadow hover:shadow-md transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-3
                      ${alert.isRead 
                        ? "bg-white/60 border-gray-200 text-gray-800" 
                        : "bg-[#309689] text-white border-[#26786f] font-semibold"}`}
                  >
                    <FiBell size={24} className={alert.isRead ? "text-[#309689]" : "text-white"} />

                    <div className="flex-1 flex flex-col gap-1">
                      <h3 className={`text-sm sm:text-base font-semibold ${alert.isRead ? "text-gray-900" : "text-white"}`}>
                        {alert.jobId ? alert.jobId.title : "Notification"}
                      </h3>

                      <p className={`text-sm ${alert.isRead ? "text-gray-700" : "text-white"}`}>
                        {alert.message}
                      </p>

                      {alert.jobId && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${alert.isRead ? "bg-gray-200 text-gray-700" : "bg-white/30 text-white"}`}>
                            {alert.jobId.location}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${alert.isRead ? "bg-gray-200 text-gray-700" : "bg-white/30 text-white"}`}>
                            {alert.jobId.jobType}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${alert.isRead ? "bg-gray-200 text-gray-700" : "bg-white/30 text-white"}`}>
                            {alert.jobId.workMode}
                          </span>
                        </div>
                      )}
                    </div>

                    {!alert.isRead && (
                      <span
                        className="absolute top-3 right-3 w-3 h-3 rounded-full bg-red-500"
                        title="Unread"
                      ></span>
                    )}
                  </div>
                </Link>

              <button
                onClick={() => handleDelete(alert._id)}
                className="absolute top-3 right-3 sm:top-10 sm:right-4 text-red-500 hover:text-red-700 
                          opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"
                title="Delete alert"
              >
                <FiTrash2 size={20}/>
              </button>

              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className="text-gray-500 text-center mt-4">No alerts found</p>
        )}
      </div>
    </div>
  )
}

export default ListAlerts


