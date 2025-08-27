'use client'

import { listusers } from "@/redux/slices/userSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const ListUsers = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { users, loading, error } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(listusers())
  }, [dispatch])

  return (
    <div>
      <h1>Users list</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {users.length > 0 ? (
        <ul>
        {users.map((u) => (
          <li key={ u._id}>
            {u.name} - {u.email} - {u.age}
          </li>
        ))}
      </ul>

      ) : (
        <p>No users found</p>
      )}
    </div>
  )
}

export default ListUsers
