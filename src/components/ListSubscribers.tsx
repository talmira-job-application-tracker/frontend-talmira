"use client";

import { SubscriberType, UserType } from "@/types/userType";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "@/api";
import Link from "next/link";

interface SubscriptionProps {
  companyId: string;
}

const ListSubscribers: React.FC<SubscriptionProps> = ({ companyId }) => {
  const [users, setUsers] = useState<SubscriberType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;
    const isAdmin = user?.role === "admin";

    if (!isAdmin) return;

    setLoading(true);
    api.get(`/subscription/${companyId}/subscribers`)
      .then((res) => {
        console.log("Subscribers response:", res.data.data);
        setUsers(res.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Subscribers</h1>

      {users.length > 0 ? (
        users.map((sub) => (
          <Link key={sub._id} href={`/profile/${sub.userId._id}`}>
            <div className="border rounded-md p-3 shadow-sm hover:shadow-md transition cursor-pointer">
              <p>
                <span className="font-semibold">Name:</span> {sub.userId.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {sub.userId.email}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p>No Subscribers found</p>
      )}
    </div>
  );
};

export default ListSubscribers;
