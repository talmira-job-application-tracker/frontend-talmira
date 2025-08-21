"use client"

import { useParams, useRouter } from "next/navigation";
import Cookies from 'js-cookie'
import { useEffect, useState } from "react";
import api from "@/api";
import toast from "react-hot-toast";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const ViewJob = () => {
    const {id} = useParams();
    const router = useRouter();
    const user = JSON.parse(Cookies.get("user") || "{}");
    const isAdmin = user?.role === "admin";

    const [job ,setJob] = useState<any>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        if (!id) return;

        api.get(`/job/${id}`)
            .then((res) => {
            setJob(res.data.data)
            })
            .catch(err => {
            console.error(err);
            toast.error("Failed to fetch Job");
            });
    }, [id]);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const handleDelete = () => {
        setLoading(true);
        api.delete(`/job/${id}`)
        .then(() => {
            toast.success("Job deleted successfully");
            router.push("/"); 
        })
        .catch(() => toast.error("Failed to delete job"))
        .finally(() => setLoading(false));
        setOpenDialog(false);
    };

    if (!job) return <p>Loading...</p>;

    return (
        <div className="p-4 max-w-xl mx-auto">
              <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>company:</strong> {job.company}</p>
              <p><strong>description:</strong> {job.description}</p>
              <p><strong>Job Type:</strong> {job.jobType}</p>
              <p><strong>salary:</strong> {job.salary}</p>
              <p><strong>language:</strong> {job.language}</p>
              <p><strong>qualification:</strong> {job.qualification}</p>
              <p>User Role: {user?.role || "No role found"}</p>

        
              {isAdmin && (
                <>
                  <Button
                    variant="contained"
                    color="error"
                    className="mt-4"
                    onClick={handleOpenDialog}
                  >
                    Delete Job
                  </Button>
        
                  <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Delete Job</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Are you sure you want to delete this Job? 
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
    )
}

export default ViewJob