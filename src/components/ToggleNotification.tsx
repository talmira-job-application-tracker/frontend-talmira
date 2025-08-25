'use client'

import { useState } from "react"
import Cookies from "js-cookie"
import api from "@/api"

const NotificationToggleButton = () => {
  const [enabled, setEnabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    const token = Cookies.get("token")
    if (!token) return

    setLoading(true)

     api.patch("/user/togglenotification")
        .then(res => {
            if (res.data?.data !== undefined) {
            setEnabled(res.data.data);
            }
        })
        .finally(() => setLoading(false)); 
        }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-4 py-2 rounded-lg font-semibold ${
        enabled ? "bg-green-500" : "bg-gray-400"
      } text-white`}
    >
      {loading ? "Updating..." : enabled ? "Notifications ON" : "Notifications OFF"}
    </button>
  )
}

export default NotificationToggleButton
