// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import toast from "react-hot-toast";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Button
// } from "@mui/material";
// import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import { getCompany, deleteCompany } from "@/redux/slices/companySlice";
// import SubscriptionButton from "@/components/ToggleSubscription";
// import ListSubscribers from "@/components/ListSubscribers";

// const ViewCompany = () => {
//   const params = useParams<{ id: string }>();
//   const id = params.id;
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const user = JSON.parse(Cookies.get("user") || "{}");
//   const isAdmin = user?.role === "admin";

//   const { company, loading, error } = useSelector((state: any) => state.company);
//   const [openDialog, setOpenDialog] = useState(false);

//   useEffect(() => {
//     if (id) {
//       dispatch(getCompany(id) as any)
//         .unwrap()
//         .catch(() => toast.error("Failed to fetch company"));
//     }
//   }, [id, dispatch]);

//   const handleOpenDialog = () => setOpenDialog(true);
//   const handleCloseDialog = () => setOpenDialog(false);

//   //delete company
//   const handleDelete = () => {
//     dispatch(deleteCompany(id) as any)
//       .unwrap()
//       .then(() => {
//         toast.success("Company deleted successfully");
//         router.push("/");
//       })
//       .catch(() => toast.error("Failed to delete company"))
//       .finally(() => setOpenDialog(false));
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!company) return <p>No company found</p>;

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h2 className="text-2xl font-bold mb-2">{company.name}</h2>
//       <p><strong>Location:</strong> {company.location}</p>
//       <p><strong>Industry:</strong> {company.industry}</p>
//       <p><strong>Description:</strong> {company.description}</p>


//       {!isAdmin && (
//         <div className="mt-4">
//           <SubscriptionButton companyId={id} />
//         </div>
//       )}

//       {isAdmin && (
//         <>
//           <Link href={`/company/${id}/addjob`}>
//             <button className="bg-blue-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
//               + Add job
//             </button>
//           </Link>

//           <Link href={`/company/${id}/subscribers`}>
//             <button className="bg-blue-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
//               Subscribers
//             </button>
//           </Link>

//           <Link href={`/company/${id}/edit`}>
//             <button className="bg-blue-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
//                Edit Company
//             </button>
//           </Link>

//           <Button
//             variant="contained"
//             color="error"
//             className="mt-4"
//             onClick={handleOpenDialog}
//           >
//             Delete Company
//           </Button>

//           <Dialog open={openDialog} onClose={handleCloseDialog}>
//             <DialogTitle>Delete Company</DialogTitle>
//             <DialogContent>
//               <DialogContentText>
//                 Are you sure you want to delete this company?
//               </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseDialog} color="primary">
//                 Cancel
//               </Button>
//               <Button onClick={handleDelete} color="error" disabled={loading}>
//                 {loading ? "Deleting..." : "Delete"}
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </>
//       )}
//     </div>
//   );
// };

// export default ViewCompany;
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
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import SubscriptionButton from "@/components/ToggleSubscription";

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
        router.push("/admin");
      })
      .catch(() => toast.error("Failed to delete company"))
      .finally(() => setOpenDialog(false));
  };

  if (loading) return <p className="text-gray-600">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!company) return <p className="text-gray-500">No company found</p>;

  return (
    <div className="min-h-screen px-6 py-10">
      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-[#309689] mb-6 hover:underline"
      >
        <ArrowLeft size={18} /> Back 
      </button>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">{company.name}</h1>
          {!isAdmin && <SubscriptionButton companyId={id} />}
      </div>

      {/* Company Info Card */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-10 p-6 border rounded-lg shadow-sm">
        {/* Logo */}
        <div className="w-28 h-28 relative border rounded-lg bg-gray-50 shadow-sm overflow-hidden flex-shrink-0">
          <Image
            src={
              company.logo
                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${company.logo.replace(
                    /\\/g,
                    "/"
                  )}`
                : "/images/noprofile.png"
            }
            alt={company.name || "company logo"}
            fill
            className="object-contain p-2 bg-white"
            unoptimized
          />
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-gray-700">
          {company.website && (
            <a
              href={
                company.website.startsWith("http")
                  ? company.website
                  : `https://${company.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:underline"
            >
              <Globe size={18} className="text-[#309689]" /> {company.website}
            </a>
          )}

          <p className="flex items-center gap-2">
            <MapPin className="text-[#309689]" size={18} />
            {company.location}
          </p>

          <p className="flex items-center gap-2">
            <Building2 className="text-[#309689]" size={18} />
            {company.industry}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">About</h2>
        <p className="text-gray-700 leading-relaxed">
          {company.description || "No description available"}
        </p>
      </div>
      

      {/* Action Buttons */}
      {isAdmin && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Subscribers */}
          <Link href={`/company/${id}/subscribers`} className="w-full md:w-auto">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#309689] hover:bg-[#26776d] text-white rounded-md shadow w-full md:w-auto">
              <Users size={18} /> Subscribers
            </button>
          </Link>

          {/* Center: Add Job */}
          <Link href={`/company/${id}/addjob`} className="w-full md:w-auto">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#26776d] hover:bg-[#1f5e56] text-white rounded-md shadow w-full md:w-auto">
              <PlusCircle size={18} /> Add Job
            </button>
          </Link>

          {/* Right: Edit + Delete */}
          <div className="flex gap-3 w-full md:w-auto justify-center">
            <Link href={`/company/${id}/edit`} className="w-full md:w-auto">
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#309689] hover:bg-[#26776d] text-white rounded-md shadow w-full md:w-auto">
                <Edit3 size={18} /> Edit
              </button>
            </Link>

            <button
              onClick={handleOpenDialog}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md shadow w-full md:w-auto"
            >
              <Trash2 size={18} /> Delete
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Company</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this company? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewCompany;






