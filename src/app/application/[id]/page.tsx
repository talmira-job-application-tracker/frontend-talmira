"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/api";
import { ApplicationType } from "@/types/applicationType";

const ViewApplication = () => {
  const { id } = useParams();
  const [application, setApplication] = useState<ApplicationType>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    setLoading(true);
    api.get(`/application/${id}`)
      .then((res) => {
        setApplication(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!application) return <p>No application found</p>;

  return (
    <div className="p-6 border rounded-md shadow-md space-y-2">
      <h1 className="text-xl font-semibold mb-4">Application Details</h1>

      <p><strong>Job:</strong> {application.job?.title || "Job Deleted"}</p>
      <p><strong>Company:</strong> {application.job?.company?.name || "Company Deleted"}</p>
      <p><strong>Status:</strong> {application.status}</p>
      <p>
        <strong>Applied At:</strong>{" "}
        {application.appliedAt
          ? new Date(application.appliedAt).toLocaleDateString()
          : "-"}
      </p>

      {application.contactInfo && (
        <div className="mt-2">
          <p><strong>Name:</strong> {application.contactInfo.name || "-"}</p>
          <p><strong>Email:</strong> {application.contactInfo.email || "-"}</p>
          <p><strong>Phone:</strong> {application.contactInfo.phone || "-"}</p>
        </div>
      )}

      <p>
        <strong>Resume:</strong>{" "}
        {application.resume ? (
          <a
            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${application.resume}`}
            target="_blank"
            className="text-blue-600 underline"
          >
            View Resume
          </a>
        ) : (
          "-"
        )}
      </p>
    </div>
  );
};

export default ViewApplication;
