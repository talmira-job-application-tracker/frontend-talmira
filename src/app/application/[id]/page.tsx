// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import api from "@/api";
// import { ApplicationType } from "@/types/applicationType";
// import toast from "react-hot-toast";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material";
// import { Briefcase, Building2, Calendar, FileText, Mail, Phone, User } from "lucide-react";
// import Header from "@/components/Header";

// const ViewApplication = () => {
//   const { id } = useParams();
//   const [application, setApplication] = useState<ApplicationType>();
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState<ApplicationType["status"] | "">("");
//   const [updating, setUpdating] = useState(false);

//   const user = JSON.parse(Cookies.get("user") || "{}");
//   const isAdmin = user?.role === "admin";

//   const [openDialog, setOpenDialog] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const token = Cookies.get("token");
//     if (!token) return;

//     setLoading(true);
//     api
//       .get(`/application/${id}`)
//       .then((res) => {
//         setApplication(res.data.data);
//         setStatus(res.data.data.status);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);

//   const handleUpdateStatus = () => {
//     if (!status) return toast.error("Please select a status");

//     setUpdating(true);
//     api
//       .patch(`/application/${id}/status`, { status })
//       .then(() => {
//         toast.success("Status updated successfully");
//         if (application) {
//           setApplication({ ...application, status });
//         }
//       })
//       .catch((err) => {
//         toast.error(err.response?.data?.message || "Failed to update status");
//       })
//       .finally(() => setUpdating(false));
//   };

//   const handleDelete = async () => {
//     try {
//       await api.delete(`/application/${id}`);
//       toast.success("Application deleted");
//       router.push("/admin/dashboard?tab=applications");
//     } catch {
//       toast.error("Failed to delete");
//     } finally {
//       setOpenDialog(false);
//     }
//   };

//   if (loading) return <p className="text-gray-600">Loading...</p>;
//   if (!application)
//     return (
//       <div className="flex items-center justify-center h-64">
//         <p className="text-gray">No application found!</p>
//       </div>
//     );

//   return (
// <div className="min-h-screen flex flex-col p-4 sm:p-8 ">
//         <Header />
//       <div className="mb-10" />

//  <div className="flex-grow flex justify-center items-start p-4 sm:p-8">
//     <div className="w-full sm:max-w-3xl bg-white/60 p-4 sm:p-8 rounded-xl shadow-lg backdrop-blur-md"> 
//          <h1 className="text-2xl font-bold text-[#366157] mb-6 flex items-center gap-2">
//           <Briefcase size={22} /> Application Details
//         </h1>

//         <div className="space-y-3 text-gray-800">
//           <p className="flex items-center gap-2">
//             <Briefcase className="text-[#309689]" size={18} />
//             <span className="font-semibold">Job:</span>{" "}
//             {application.job?.title || "Job Deleted"}
//           </p>
//           <p className="flex items-center gap-2">
//             <Building2 className="text-[#309689]" size={18} />
//             <span className="font-semibold">Company:</span>{" "}
//             {application.job?.company?.name || "Company Deleted"}
//           </p>
//           <p className="flex items-center gap-2">
//             <FileText className="text-[#309689]" size={18} />
//             <span className="font-semibold">Status:</span> {application.status}
//           </p>
//           <p className="flex items-center gap-2">
//             <Calendar className="text-[#309689]" size={18} />
//             <span className="font-semibold">Applied At:</span>{" "}
//             {application.appliedAt
//               ? new Date(application.appliedAt).toLocaleDateString()
//               : "-"}
//           </p>
//           {/* New fields */}
//           {application.prevPosition && (
//             <p className="flex items-center gap-2">
//               <Briefcase className="text-[#309689]" size={18} />
//               <span className="font-semibold">Previous Position:</span>{" "}
//               {application.prevPosition}
//             </p>
//           )}
//           {application.prevCompany && (
//             <p className="flex items-center gap-2">
//               <Building2 className="text-[#309689]" size={18} />
//               <span className="font-semibold">Previous Company:</span>{" "}
//               {application.prevCompany}
//             </p>
//           )}
//         </div>

//         {application.contactInfo && (
//           <div className="mt-6 p-4 rounded-lg border border-gray-200 bg-gray-50/70">
//             <h2 className="text-lg font-semibold text-[#366157] mb-3 flex items-center gap-2">
//               <User size={20} /> Contact Information
//             </h2>
//             <p className="flex items-center gap-2">
//               <User className="text-[#309689]" size={18} />
//               <span className="font-semibold">Name:</span>{" "}
//               {application.contactInfo.name || "-"}
//             </p>
//             <p className="flex items-center gap-2">
//               <Mail className="text-[#309689]" size={18} />
//               <span className="font-semibold">Email:</span>{" "}
//               {application.contactInfo.email || "-"}
//             </p>
//             <p className="flex items-center gap-2">
//               <Phone className="text-[#309689]" size={18} />
//               <span className="font-semibold">Phone:</span>{" "}
//               {application.contactInfo.phone || "-"}
//             </p>
//           </div>
//         )}

//         <div className="mt-4 flex items-center gap-2 flex-wrap">
//           <FileText className="text-[#309689]" size={18} />
//           <span className="font-semibold">Resume:</span>{" "}
//           {application.resume ? (
//             <a
//               href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${application.resume}`}
//               target="_blank"
//               className="text-[#26786f] underline hover:text-[#309689]"
//             >
//               View Resume
//             </a>
//           ) : (
//             "-"
//           )}
//         </div>

//         {isAdmin && (
//           <div className="mt-8 border-t pt-6">
//             <h2 className="text-lg font-semibold text-[#366157] mb-3">
//               Update Application Status
//             </h2>

//             <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//               <select
//       value={status}
//       onChange={handleChange}
//       className="border p-2 rounded-lg w-full sm:w-52 focus:ring-2 focus:ring-[#309689]"
//     >
//       <option value="">-- Select Status --</option>
//       <option value="rejected">Rejected</option>
//       <option value="selected">Selected</option>
//     </select>
//               <button
//                 onClick={handleUpdateStatus}
//                 disabled={updating}
//                 className="px-4 py-1.5 bg-[#309689] text-white rounded-lg hover:bg-[#26786f] transition-colors disabled:opacity-50 text-sm w-full sm:w-auto"
//               >
//                 {updating ? "Updating..." : "Update"}
//               </button>
//             </div>
//             <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-2">
//               <Button
//                 variant="contained"
//                 className="!bg-red-500 hover:!bg-red-700 !text-white !rounded-lg shadow-md w-full sm:w-auto"
//                 onClick={() => setOpenDialog(true)}
//               >
//                 Delete Application
//               </Button>
//             </div>
//           </div>
//         )}

//       </div>

//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>Delete Application</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to permanently delete this application?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDelete} color="error" disabled={loading}>
//             {loading ? "Deleting..." : "Delete"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//     </div>
//   );
// };

// export default ViewApplication;


"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/api";
import { ApplicationType } from "@/types/applicationType";
import toast from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Briefcase, Building2, Calendar, FileText, Mail, Phone, User } from "lucide-react";
import Header from "@/components/Header";

const ViewApplication = () => {
  const { id } = useParams();
  const [application, setApplication] = useState<ApplicationType>();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<ApplicationType["status"] | "">("");
  const [updating, setUpdating] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const user = JSON.parse(Cookies.get("user") || "{}");
  const isAdmin = user?.role === "admin";

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    setLoading(true);
    api
      .get(`/application/${id}`)
      .then((res) => {
        setApplication(res.data.data);
        setStatus(res.data.data.status ?? "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleUpdateStatus = () => {
    if (!status) return toast.error("Please select a status");

    setUpdating(true);
    api
      .patch(`/application/${id}/status`, { status })
      .then(() => {
        toast.success("Status updated successfully");
        if (application) setApplication({ ...application, status });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to update status");
      })
      .finally(() => setUpdating(false));
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/application/${id}`);
      toast.success("Application deleted");
      router.push("/admin/dashboard?tab=applications");
    } catch {
      toast.error("Failed to delete");
    } finally {
      setOpenDialog(false);
    }
  };

  if (loading)
    return <p className="text-gray-600">Loading...</p>;

  if (!application)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray">No application found!</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col py-30 sm:p-8">
      <div className="mb-10" />

      <div className="flex-grow flex justify-center items-start p-4 sm:p-8">
        <div className="w-full sm:max-w-3xl bg-white/60 p-4 sm:p-8 rounded-xl shadow-lg backdrop-blur-md">
          <h1 className="text-2xl font-bold text-[#366157] mb-6 flex items-center gap-2">
            <Briefcase size={22} /> Application Details
          </h1>

          <div className="space-y-3 text-gray-800">
            <p className="flex items-center gap-2">
              <Briefcase className="text-[#309689]" size={18} />
              <span className="font-semibold">Job:</span>{" "}
              {application.job?.title || "Job Deleted"}
            </p>
            <p className="flex items-center gap-2">
              <Building2 className="text-[#309689]" size={18} />
              <span className="font-semibold">Company:</span>{" "}
              {application.job?.company?.name || "Company Deleted"}
            </p>
            <p className="flex items-center gap-2">
              <FileText className="text-[#309689]" size={18} />
              <span className="font-semibold">Status:</span> {application.status}
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="text-[#309689]" size={18} />
              <span className="font-semibold">Applied At:</span>{" "}
              {application.appliedAt
                ? new Date(application.appliedAt).toLocaleDateString()
                : "-"}
            </p>
            {application.prevPosition && (
              <p className="flex items-center gap-2">
                <Briefcase className="text-[#309689]" size={18} />
                <span className="font-semibold">Previous Position:</span>{" "}
                {application.prevPosition}
              </p>
            )}
            {application.prevCompany && (
              <p className="flex items-center gap-2">
                <Building2 className="text-[#309689]" size={18} />
                <span className="font-semibold">Previous Company:</span>{" "}
                {application.prevCompany}
              </p>
            )}
          </div>

          {application.contactInfo && (
            <div className="mt-6 p-4 rounded-lg border border-gray-200 bg-gray-50/70">
              <h2 className="text-lg font-semibold text-[#366157] mb-3 flex items-center gap-2">
                <User size={20} /> Contact Information
              </h2>
              <p className="flex items-center gap-2">
                <User className="text-[#309689]" size={18} />
                <span className="font-semibold">Name:</span>{" "}
                {application.contactInfo.name || "-"}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="text-[#309689]" size={18} />
                <span className="font-semibold">Email:</span>{" "}
                {application.contactInfo.email || "-"}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="text-[#309689]" size={18} />
                <span className="font-semibold">Phone:</span>{" "}
                {application.contactInfo.phone || "-"}
              </p>
            </div>
          )}

          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <FileText className="text-[#309689]" size={18} />
            <span className="font-semibold">Resume:</span>{" "}
            {application.resume ? (
              <a
                href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${application.resume}`}
                target="_blank"
                className="text-[#26786f] underline hover:text-[#309689]"
              >
                View Resume
              </a>
            ) : (
              "-"
            )}
          </div>

          {isAdmin && (
            <div className="mt-8 border-t pt-6">
              <h2 className="text-lg font-semibold text-[#366157] mb-3">
                Update Application Status
              </h2>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as ApplicationType["status"])
                  }
                  className="border p-2 rounded-lg w-full sm:w-52 focus:ring-2 focus:ring-[#309689]"
                >
                  <option value="">-- Select Status --</option>
                  <option value="rejected">Rejected</option>
                  <option value="selected">Selected</option>
                </select>

                <button
                  onClick={handleUpdateStatus}
                  disabled={updating}
                  className="px-4 py-1.5 bg-[#309689] text-white rounded-lg hover:bg-[#26786f] transition-colors disabled:opacity-50 text-sm w-full sm:w-auto"
                >
                  {updating ? "Updating..." : "Update"}
                </button>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-2">
                <Button
                  variant="contained"
                  className="!bg-black/50 hover:!bg-black/70 !text-white !rounded-lg shadow-md w-full sm:w-auto"
                  onClick={() => setOpenDialog(true)}
                >
                  Delete Application
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Delete Dialog */}
        {openDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-6 max-w-sm w-full shadow-xl">
              
              {/* Title */}
              <h2 className="text-xl font-semibold text-white mb-2">Delete Application</h2>
              <p className="text-gray-300 text-sm mb-6">
                Are you sure you want to permanently delete this application? This action cannot be undone.
              </p>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setOpenDialog(false)}
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
    </div>
  );
};

export default ViewApplication;
