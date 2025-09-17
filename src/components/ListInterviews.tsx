'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/api";

const ListInterviews = () => {
  const [interviews, setInterviews] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    api.get("/interview/list")
      .then(res => setInterviews(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const handleJobClick = (jobId: string) => {
    if (jobId) router.push(`/job/${jobId}`);
  };

  return (
    <div className="px-6 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Scheduled Interviews</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-xl overflow-hidden shadow-md bg-teal-50">
          <thead className="bg-gray-100">
            <tr>
              {["Job", "Candidate", "Email", "Phone", "Date & Time", "Mode"].map((col) => (
                <th key={col} className="px-6 bg-[#309689] py-3 text-left text-white font-semibold uppercase tracking-wide">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-800">
            {interviews.map((intv) => (
              <tr key={intv._id} className="hover:bg-gray-50 transition-colors cursor-default">
                <td
                  className="px-6 py-4 text-teal-600 font-medium hover:underline cursor-pointer"
                  onClick={() => handleJobClick(intv.jobId?._id)}
                >
                  {intv.jobId?.title || "N/A"}
                </td>
                <td className="px-6 py-4">{intv.candidateId?.name || "N/A"}</td>
                <td className="px-6 py-4">
                  {intv.candidateId?.email ? (
                    <a
                      href={`mailto:${intv.candidateId.email}`}
                      className="text-teal-600 hover:underline"
                    >
                      {intv.candidateId.email}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-6 py-4">{intv.candidateId?.phone || "N/A"}</td>
                <td className="px-6  py-4">{intv.scheduledAt ? new Date(intv.scheduledAt).toLocaleString() : "N/A"}</td>
                <td className="px-6 py-4">{intv.mode || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListInterviews;
