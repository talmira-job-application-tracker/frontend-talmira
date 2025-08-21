'use client'

import api from "@/api";
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
  Button
} from "@mui/material";
import Link from "next/link";

const ViewCompany = () => {
  const { id } = useParams();
  const router = useRouter();
  const user = JSON.parse(Cookies.get("user") || "{}");
  const isAdmin = user?.role === "admin";

  const [company, setCompany] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    api.get(`/company/view/${id}`)
      .then((res) => {
        setCompany(res.data.data)
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to fetch company");
      });
  }, [id]);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleDelete = () => {
    setLoading(true);
    api.delete(`/company/delete/${id}`)
      .then(() => {
        toast.success("Company deleted successfully");
        router.push("/"); 
      })
      .catch(() => toast.error("Failed to delete company"))
      .finally(() => setLoading(false));
    setOpenDialog(false);
  };

  if (!company) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{company.name}</h2>
      <p><strong>Location:</strong> {company.location}</p>
      <p><strong>Industry:</strong> {company.industry}</p>

      {isAdmin && (
        <>
          <Link href={`/company/${id}/addjob`}>
                  <button className="bg-blue-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                    + Add job
                  </button>
          </Link>
          <Button
            variant="contained"
            color="error"
            className="mt-4"
            onClick={handleOpenDialog}
          >
            Delete Company
          </Button>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Delete Company</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this company? 
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
        </>
      )}
    </div>
  );
};

export default ViewCompany;
