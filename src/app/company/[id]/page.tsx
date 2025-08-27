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
  Button
} from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getCompany, deleteCompany } from "@/redux/slices/companySlice";
import SubscriptionButton from "@/components/ToggleSubscription";
import ListSubscribers from "@/components/ListSubscribers";

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

  //delete company
  const handleDelete = () => {
    dispatch(deleteCompany(id) as any)
      .unwrap()
      .then(() => {
        toast.success("Company deleted successfully");
        router.push("/");
      })
      .catch(() => toast.error("Failed to delete company"))
      .finally(() => setOpenDialog(false));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!company) return <p>No company found</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{company.name}</h2>
      <p><strong>Location:</strong> {company.location}</p>
      <p><strong>Industry:</strong> {company.industry}</p>
      <p><strong>Description:</strong> {company.description}</p>


      {!isAdmin && (
        <div className="mt-4">
          <SubscriptionButton companyId={id} />
        </div>
      )}

      {isAdmin && (
        <>
          <Link href={`/company/${id}/addjob`}>
            <button className="bg-blue-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
              + Add job
            </button>
          </Link>

          <Link href={`/company/${id}/subscribers`}>
            <button className="bg-blue-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
              Subscribers
            </button>
          </Link>

          <Link href={`/company/${id}/edit`}>
            <button className="bg-blue-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
               Edit Company
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
