'use client'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { listUsers,  } from "@/redux/slices/userSlice"
import { FiEye } from "react-icons/fi"
import Link from "next/link"
import { UserType } from "@/types/userType"
import Image from "next/image"

const ListUsers = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { users, loading, error } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(listUsers ())
  }, [dispatch])

  return (
    <div className="min-h-screen px-8 py-6 bg-gradient-to-r from-white/30 to-white/10 backdrop-blur-md ">
      {/* <h1 className="text-2xl font-bold text-[#309689] mb-6">Users List</h1> */}

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full  rounded-lg">
            <thead className="bg-[#309689] text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((u: UserType) => u.role !== "admin") // exclude admin users
                .map((u: UserType) => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 relative">
                          <Image
                            src={
                              u.image
                                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${u.image.replace(/\\/g, "/")}`
                                : "/images/noprofile.png"
                            }
                            alt={u.name || "profile picture"}
                            fill
                            className="object-cover rounded-full"
                            unoptimized
                          />
                        </div>
                        <>
                        <Link href={`/profile/${u._id}`}>
                        <span>{u.name}</span>
                        </Link>
                        </>
                      </div>
                    </td>
                    <td className="px-4 py-2">{u.role}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className={`px-4 py-2 font-semibold ${u.isDeleted ? "text-red-600" : "text-green-600"}`}>
                      {u.isDeleted ? "Inactive" : "Active"}
                    </td>
                    <td className="px-4 py-2">
                      <Link href={`/profile/${u._id}`} className="inline-flex items-center gap-2 px-3 py-1 bg-white text-[#309689] rounded hover:bg-grey">
                        <FiEye /> View
                      </Link>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="text-gray-500">No users found</p>
      )}
    </div>
  )
}

export default ListUsers


