
'use client'

import { AppDispatch, RootState } from "@/redux/store";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { viewProfile, viewUserById } from "@/redux/slices/userSlice";
import Image from "next/image";
import { Mail, Phone, User, Award, TriangleAlert } from "lucide-react";
import api from "@/api";
import { motion, AnimatePresence } from "framer-motion";

const ViewProfile = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id?.[0];
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.user);
  const loggedInUser = Cookies.get("user") ? JSON.parse(Cookies.get("user") as string) : null;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
    }
    if (userId) {
      dispatch(viewUserById(userId));
    } else {
      dispatch(viewProfile());
    }
  }, [dispatch, userId, router]);

  const handleDelete = () => {
    setDeleting(true);
    api.delete("/user/delete")
      .then(() => {
        Cookies.remove("token");
        Cookies.remove("user");
        router.push("/");
      })
      .catch((err) => console.error("Error deleting account:", err))
      .finally(() => setDeleting(false));
  };

  if (loading) return <div className="text-center py-10 text-gray-500">Loading profile...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!user) return <div className="text-center py-10 text-red-500">No profile found</div>;

  return (
    <div className="min-h-screen py-30 px-6">
      <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl border border-white/30">
        <div className="bg-gradient-to-r from-teal-900 to-teal-400 p-8 text-center relative">
          <div className="w-32 h-32 mx-auto relative rounded-full border-4 border-white shadow-lg overflow-hidden">
            <Image
              src={user.image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${user.image.replace(/\\/g, "/")}` : "/images/noprofile.png"}
              alt={user.name || "profile picture"}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-white">{user.name}</h2>
          <span className="text-sm text-teal-100 tracking-wide uppercase">{user.role}</span>
        </div>

        <div className="backdrop-blur-xl p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 bg-white/50 p-4 rounded-xl shadow-sm">
              <Mail className="w-5 h-5 text-teal-600" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm text-gray-900">{user.email}</p>
              </div>
            </div>

            {user.role !== "admin" && (
              <>
                <div className="flex items-center gap-3 bg-white/50 p-4 rounded-xl shadow-sm">
                  <User className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-xs text-gray-500">Age</p>
                    <p className="text-sm text-gray-900">{user.age}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/50 p-4 rounded-xl shadow-sm">
                  <Phone className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm text-gray-900">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/50 p-4 rounded-xl shadow-sm">
                  <Award className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-xs text-gray-500">Skills</p>
                    <p className="text-sm text-gray-900">
                      {Array.isArray(user.skills) ? user.skills.join(", ") : user.skills}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {loggedInUser?.role !== "admin" && (
              <>
                <button
                  onClick={() => router.push(`/profile/edit`)}
                  className="px-6 py-2 rounded-xl bg-teal-600 text-white shadow hover:bg-teal-700 hover:shadow-lg transition-all duration-200"
                >
                  Edit Profile
                </button>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-6 py-2 rounded-xl bg-red-500 text-white shadow hover:bg-red-600 hover:shadow-lg transition-all duration-200"
                >
                  Delete Account
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/*  Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-center">
                <TriangleAlert className="text-red-600 w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 text-center">Delete Account</h2>
              <p className="text-gray-600 text-center">Deleting your account will permanently remove all your data.</p>
              <p className="text-gray-500 italic text-center">Thank you for being with us. You’re always welcome back!</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewProfile;
