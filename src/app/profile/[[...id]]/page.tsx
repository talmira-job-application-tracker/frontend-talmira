"use client";

import { AppDispatch, RootState } from "@/redux/store";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { viewProfile, viewUserById } from "@/redux/slices/userSlice";
import Image from "next/image";
import { Mail, Phone, User, Award } from "lucide-react";

const ViewProfile = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id?.[0];
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.user);

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

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center py-10 text-red-500">No profile found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-teal-50 to-white py-12 px-6">
      <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl border border-white/30">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-400 p-8 text-center relative">
          <div className="w-32 h-32 mx-auto relative rounded-full border-4 border-white shadow-lg overflow-hidden">
            <Image
              src={
                user.image
                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${user.image.replace(/\\/g, "/")}`
                  : "/images/noprofile.png"
              }
              alt={user.name || "profile picture"}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-white">{user.name}</h2>
          <span className="text-sm text-teal-100 tracking-wide uppercase">{user.role}</span>
        </div>

        {/* Info Section */}
        <div className="bg-white/70 backdrop-blur-xl p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Always show Email */}
            <div className="flex items-center gap-3 bg-white/50 p-4 rounded-xl shadow-sm">
              <Mail className="w-5 h-5 text-teal-600" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm text-gray-900">{user.email}</p>
              </div>
            </div>

            {/* Show extra fields ONLY if not admin */}
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

          {/* Actions */}
          {!userId && (
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => router.push(`/profile/edit`)}
                className="px-6 py-2 rounded-xl bg-teal-600 text-white shadow hover:bg-teal-700 hover:shadow-lg transition-all duration-200"
              >
                Edit Profile
              </button>
              <button
                onClick={() => router.push(`/profile/delete`)}
                className="px-6 py-2 rounded-xl bg-teal-500 text-white shadow hover:bg-red-400 hover:shadow-lg transition-all duration-200"
              >
                Delete Profile
              </button>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 bg-white text-gray-800 border border-gray-200 rounded-xl shadow hover:bg-gray-100 hover:text-black transition-all duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
