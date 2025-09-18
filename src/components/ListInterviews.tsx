'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/api";

const ListInterviews = () => {
  const [interviews, setInterviews] = useState<any[]>([]);

  useEffect(() => {
    api.get("/interview/list")
      .then(res => setInterviews(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="px-6 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Scheduled Interviews</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-xl overflow-hidden shadow-md bg-teal-50">
          <thead className="bg-gray-100">
            <tr>
              {["Job", "Candidate", "Email", "Phone", "Date & Time", "Mode"].map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-white bg-[#309689] font-semibold uppercase tracking-wide"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-800">
            {interviews.map((intv) => (
              <tr key={intv._id} className="hover:bg-gray-50 transition-colors">
                {/* Job */}
                <td className="px-6 py-4 text-teal-600 font-medium hover:underline cursor-pointer">
                  {intv.application?.job?._id ? (
                    <Link href={`/job/${intv.application.job._id}`}>
                      {intv.application.job.title || "N/A"}
                    </Link>
                  ) : "N/A"}
                </td>

                {/* Candidate Name */}
                <td className="px-6 py-4 text-teal-600 font-medium hover:underline cursor-pointer">
                  {intv.application?.user?._id ? (
                    <Link href={`/profile/${intv.application.user._id}`}>
                      {intv.application.user.name || "N/A"}
                    </Link>
                  ) : "N/A"}
                </td>

                {/* Email */}
                <td className="px-6 py-4">
                  {intv.application?.user?.email ? (
                    <a
                      href={`mailto:${intv.application.user.email}`}
                      className="text-teal-600 hover:underline"
                    >
                      {intv.application.user.email}
                    </a>
                  ) : "N/A"}
                </td>

                {/* Phone */}
                <td className="px-6 py-4">{intv.application?.user?.phone || "N/A"}</td>

                {/* Date & Time */}
                <td className="px-6 py-4">
                  {intv.scheduledAt ? new Date(intv.scheduledAt).toLocaleString() : "N/A"}
                </td>

                {/* Mode */}
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
