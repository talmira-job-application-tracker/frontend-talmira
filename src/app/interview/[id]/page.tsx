"use client"

import { InterviewType } from "@/types/interviewType";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "@/api";
import toast from "react-hot-toast";

const ViewInterview = () => {
    const {id} = useParams();
    const [interview, setInterview] = useState<InterviewType>();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get("token");
      if(!token) {
        router.push('/')
      };

      setLoading(true);

      api.get(`/interview/${id}`)
      .then((res) => {
        setInterview(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false)
        toast.error("Failed to fetch")});
    },[id]);

    if (loading)
    return <p className="text-gray-600">Loading...</p>;

  if (!interview)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray">No Interview found!, It might have been removed by admin.</p>
      </div>
    );

  return (
    <div className="py-8">
  <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">
      Interview Details
    </h1>

    {/* Job info */}
    <div className="mb-4">
      <h2 className="text-xl font-semibold text-teal-600">
        {interview.application.job.title}
      </h2>
      <p className="text-gray-500">
        Company: {interview.application.job.company.name}
      </p>
    </div>

    {/* Candidate info */}
    <div className="mb-4">
      <h3 className="text-lg font-medium text-gray-700">Candidate</h3>
      <p>Name: {interview.application.user?.name || "N/A"}</p>
      <p>Email: {interview.application.user?.email || "N/A"}</p>
      <p>Phone: {interview.application.user?.phone || "N/A"}</p>
    </div>

    {/* Interview details */}
    <div className="mb-4">
      <h3 className="text-lg font-medium text-gray-700">Interview Details</h3>
      <p>
        Date & Time:{" "}
        {interview.scheduledAt
          ? new Date(interview.scheduledAt).toLocaleString()
          : "N/A"}
      </p>
      <p>Mode: {interview.mode}</p>
      {interview.location && <p>Location: {interview.location}</p>}
      {interview.notes && <p>Notes: {interview.notes}</p>}
      <p>Status: {interview.status}</p>
    </div>

    {/* Optional actions */}
    <div className="flex justify-end mt-6">
      <button
        onClick={() => router.push('/admin/dashboard?tab=interviews')}
        className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition"
      >
        Go Back
      </button>
    </div>
  </div>
  </div>
);
}

export default ViewInterview;