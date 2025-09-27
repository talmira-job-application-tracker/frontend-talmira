"use client";

import { InterviewType } from "@/types/interviewType";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "@/api";
import toast from "react-hot-toast";

const ViewInterview = () => {
  const { id } = useParams();
  const [interview, setInterview] = useState<InterviewType>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) router.push("/");

    setLoading(true);
    api
      .get(`/interview/${id}`)
      .then((res) => setInterview(res.data.data))
      .catch(() => toast.error("Failed to fetch"))
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) return <p className="text-gray-600 text-center mt-10">Loading...</p>;

  if (!interview)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No Interview found! It might have been removed by admin.</p>
      </div>
    );

  return (
    <div className="py-7">
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white/80 rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Interview Details</h1>

      {/* Job Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-teal-600 mb-2">Job Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <p className="font-medium text-gray-700">Job:</p>
          <p>{interview.application?.job?.title || "N/A"}</p>

          <p className="font-medium text-gray-700">Company:</p>
          <p>{interview.application?.job?.company?.name || "N/A"}</p>

          <p className="font-medium text-gray-700">Status:</p>
          <p>{interview.status || "N/A"}</p>

          <p className="font-medium text-gray-700">Scheduled At:</p>
          <p>{interview.scheduledAt ? new Date(interview.scheduledAt).toLocaleString() : "N/A"}</p>
        </div>
      </div>

      {/* Candidate Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-teal-600 mb-2">Candidate Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <p className="font-medium text-gray-700">Name:</p>
          <p>{interview.application?.user?.name || "N/A"}</p>

          <p className="font-medium text-gray-700">Email:</p>
          <p>{interview.application?.user?.email || "N/A"}</p>

          <p className="font-medium text-gray-700">Phone:</p>
          <p>{interview.application?.user?.phone || "N/A"}</p>
        </div>
      </div>

      {/* Interview Details Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-teal-600 mb-2">Interview Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <p className="font-medium text-gray-700">Mode:</p>
          <p>{interview.mode || "N/A"}</p>

          {interview.location && (
            <>
              <p className="font-medium text-gray-700">Location:</p>
              <p>{interview.location}</p>
            </>
          )}

          {interview.notes && (
            <>
              <p className="font-medium text-gray-700">Notes:</p>
              <p>{interview.notes}</p>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => router.push("/admin/dashboard?tab=interviews")}
          className="px-6 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition"
        >
          Go Back
        </button>
      </div>
    </div>
    </div>
  );
};

export default ViewInterview;
