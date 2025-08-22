'use client'

import api from "@/api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Cookies from "js-cookie"

const DeleteUser = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

 const handleDelete = () => {
  setLoading(true);
  api.delete("/user/delete")
    .then(() => {
      Cookies.remove("token");
      Cookies.remove("user");

      router.push("/");
    })
    .catch((err) => {
      console.error("Error deleting account:", err);
    })
    .finally(() => {
      setLoading(false);
    });
}


  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow-md text-center space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Delete Account</h2>

      <p className="text-gray-600">
        We’re sorry to see you go. Once you delete your account, all your data
        will be permanently removed and cannot be recovered.
      </p>

      <p className="text-gray-600 italic">
        Thank you for being with us. If you ever decide to return, we’ll always
        welcome you back.
      </p>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => router.push("/profile")}
          className="px-4 py-2 border rounded-lg text-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          {loading ? "Deleting..." : "Confirm Delete"}
        </button>
      </div>
    </div>
  )
}

export default DeleteUser
