"use client";

import { useState, useEffect } from "react";
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
        const companies = res.data?.data || [];
        const subscribedCompanyIds = companies.map((c: any) => c._id);
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
      const res = await api.patch(`/subscription/toggle/${companyId}`);
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

  if (isSubscribed === null) return <p className="text-gray-500">Loading subscription...</p>;

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-5 py-2.5 rounded-full font-semibold transition 
        flex items-center justify-center shadow-md 
        transform active:scale-95 duration-150 ease-in-out
        ${loading ? "opacity-70 cursor-not-allowed" : ""}
        ${isSubscribed 
          ? "bg-[#309689] hover:bg-[#26786f] text-white" 
          : "bg-[#309689] hover:bg-[#26786f] text-white"}
      `}
      >
      {loading ? "Please wait..." : isSubscribed ? "Unsubscribe" : "Subscribe"}
    </button>

  );
};

export default SubscriptionButton;
