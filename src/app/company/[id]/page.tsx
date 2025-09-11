"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getCompany, deleteCompany } from "@/redux/slices/companySlice";
import {
  MapPin,
  Building2,
  PlusCircle,
  Users,
  Edit3,
  Trash2,
  Globe,
} from "lucide-react";
import Image from "next/image";
import SubscriptionButton from "@/components/ToggleSubscription";
import Header from "@/components/Header";

const ViewCompany = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const dispatch = useDispatch();

  const user = JSON.parse(Cookies.get("user") || "{}");
  const isAdmin = user?.role === "admin";

  const { company, loading, error } = useSelector((state: any) => state.company);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getCompany(id) as any)
        .unwrap()
        .catch(() => toast.error("Failed to fetch company"));
    }
  }, [id, dispatch]);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleDelete = () => {
    dispatch(deleteCompany(id) as any)
      .unwrap()
      .then(() => {
        toast.success("Company deleted successfully");
        router.push("/admin/dashboard?tab=companies");
      })
      .catch(() => toast.error("Failed to delete company"))
      .finally(() => setOpenDialog(false));
  };

  if (loading) return <p className="text-gray-600 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!company) return <p className="text-gray-500 text-center">No company found</p>;

  return (
    <div className="min-h-screen px-4 sm:px-6 py-20">
      <div className="mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 p-6 rounded-lg shadow-sm bg-white/50 backdrop-blur-md">
        <div className="w-28 h-28 sm:w-32 sm:h-32 relative border rounded-lg bg-gray-50 shadow overflow-hidden flex-shrink-0">
          {company.logo && (
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${company.logo.replace(/\\/g, "/")}`}
              alt={company.name || "company logo"}
              fill
              className="object-contain p-2 bg-white"
              unoptimized
            />
          )}
        </div>


        <div className="flex flex-col gap-3 w-full text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{company.name}</h1>

          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center md:justify-start gap-3 text-gray-700">
            {company.website && (
              <a
                href={
                  company.website?.startsWith("http")
                    ? company.website
                    : `https://${company.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline justify-center md:justify-start"
              >
                <Globe size={18} className="text-[#309689]" /> {company.website}
              </a>
            )}

            <p className="flex items-center gap-2 justify-center md:justify-start">
              <MapPin className="text-[#309689]" size={18} /> {company.location}
            </p>

            <p className="flex items-center gap-2 justify-center md:justify-start">
              <Building2 className="text-[#309689]" size={18} /> {company.industry}
            </p>
          </div>

          {!isAdmin && (
            <div className="mt-3 flex justify-center md:justify-start">
              <SubscriptionButton companyId={id} />
            </div>
          )}
        </div>
      </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 px-2 sm:px-0">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center md:text-left">About</h2>
        <p className="text-gray-700 leading-relaxed text-center md:text-left">
          {company.description || "No description available"}
        </p>
      </div>

      {/* Admin Actions */}
{isAdmin && (
  <div className="max-w-6xl mx-auto mt-12 flex flex-wrap gap-4 justify-center md:justify-start">
    <Link href={`/company/${id}/subscribers`} className="flex-1 sm:flex-none">
      <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#309689] hover:bg-[#26776d] text-white rounded-md shadow w-full sm:w-auto">
        <Users size={18} /> Subscribers
      </button>
    </Link>

    <Link href={`/company/${id}/addjob`} className="flex-1 sm:flex-none">
      <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#26776d] hover:bg-[#1f5e56] text-white rounded-md shadow w-full sm:w-auto">
        <PlusCircle size={18} /> Add Job
      </button>
    </Link>

    <Link href={`/company/${id}/edit`} className="flex-1 sm:flex-none">
      <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#309689] hover:bg-[#26776d] text-white rounded-md shadow w-full sm:w-auto">
        <Edit3 size={18} /> Edit
      </button>
    </Link>

    <button
      onClick={handleOpenDialog}
      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-black/50 hover:bg-black/70 text-white rounded-md shadow w-full sm:w-auto"
    >
      <Trash2 size={18} /> Delete
    </button>
  </div>
)}

      {/* Delete Confirmation Dialog */}
      {openDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-6 max-w-sm w-full shadow-xl">
            
            {/* Title */}
            <h2 className="text-xl font-semibold text-white mb-2">Delete Company</h2>
            <p className="text-gray-300 text-sm mb-6">
              Are you sure you want to delete this company? This action cannot be undone.
            </p>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 rounded-xl border border-white/20 bg-white/5 text-gray-300 hover:bg-white/20 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-teal-500 text-white font-medium hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ViewCompany;







