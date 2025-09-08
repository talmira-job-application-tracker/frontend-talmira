"use client";

import { SubscriberType } from "@/types/userType";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "@/api";
import Link from "next/link";
import Image from "next/image";

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
    api
      .get(`/subscription/${companyId}/subscribers`)
      .then((res) => {
        setUsers(res.data.data);
      })
      .finally(() => setLoading(false));
  }, [companyId ?? ""]);

  if (loading) return <p className="text-gray-600">Loading...</p>;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-[#309689] mb-6">
        Subscribers
      </h1>

      {users.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.map((sub) => (
            <Link key={sub._id} href={`/profile/${sub.userId._id}`}>
              <div className="flex items-center gap-4 rounded-xl bg-white border border-gray-200 p-4 shadow-sm hover:shadow-md hover:border-[#309689] transition cursor-pointer">
                {/* Profile Picture */}
                <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-[#309689] flex-shrink-0">
                  <Image
                    src={
                      sub.userId.image
                        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${sub.userId.image.replace(/\\/g, "/")}`
                        : "/images/noprofile.png"
                    }
                    alt={sub.userId.name}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>

                {/* Subscriber Details */}
                <div>
                  <p className="text-gray-900 font-semibold">
                    {sub.userId.name}
                  </p>
                  <p className="text-gray-600 text-sm">{sub.userId.email}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No Subscribers found</p>
      )}
    </div>
  );
};

export default ListSubscribers;

