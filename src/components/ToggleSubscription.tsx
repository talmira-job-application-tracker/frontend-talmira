"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import api from "@/api";

interface SubscriptionButtonProps {
  companyId: string;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ companyId }) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await api.get(`/subscription/subs-companies`);


        const subscribedCompanyIds = res.data.map((c: any) => c._id);
        setIsSubscribed(subscribedCompanyIds.includes(companyId));
      } catch (err) {
        console.error("Fetch subscription status failed:", err);
        setIsSubscribed(false);
      }
    };
    fetchStatus();
  }, [companyId, token]);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const res = await api.patch(`/subscription/toggle/${companyId}`,);

      if (res.data.action === "subscribed" || res.data.action === "resubscribed") {
        setIsSubscribed(true);
        toast.success("Subscribed successfully!");
      } else if (res.data.action === "unsubscribed") {
        setIsSubscribed(false);
        toast.success("Unsubscribed successfully!");
      }
    } catch (err) {
      console.error("Toggle subscription failed:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (isSubscribed === null) return <p>Loading subscription...</p>;

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-4 py-2 rounded-lg text-white font-medium transition
        ${isSubscribed ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
      `}
    >
      {loading ? "Please wait..." : isSubscribed ? "Unsubscribe" : "Subscribe"}
    </button>
  );
};

export default SubscriptionButton;
