'use client'

import api from "@/api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Cookies from "js-cookie"
import { TriangleAlert } from "lucide-react"
import Header from "@/components/Header"

const DeleteUser = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = () => {
    setLoading(true)
    api.delete("/user/delete")
      .then(() => {
        Cookies.remove("token")
        Cookies.remove("user")
        router.push("/")
      })
      .catch((err) => {
        console.error("Error deleting account:", err)
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <Header/>
      <div className="w-full bg-white/50 max-w-md rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">

        <div className="flex justify-center">
          <TriangleAlert className="text-red-600 w-12 h-12" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Delete Account 
        </h2>
        <p className="text-gray-600 text-center">
          Deleting your account will permanently remove all your data.
        </p>

        <p className="text-gray-500 italic text-center">
          Thank you for being with us. You’re always welcome back!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <button
            onClick={() => router.push("/profile")}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteUser

