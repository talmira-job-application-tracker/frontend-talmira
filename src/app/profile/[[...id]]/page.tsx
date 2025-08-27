"use client";

import { AppDispatch, RootState } from "@/redux/store";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { viewProfile, viewUserById } from "@/redux/slices/userSlice";
import Image from "next/image";

const ViewProfile = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id?.[0]; // optional param
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
    }

    if (userId) {
      // Admin is viewing another user
      dispatch(viewUserById(userId));
    } else {
      // Logged-in user’s own profile
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
    <div className="p-4 max-w-md mx-auto">
      <div className="flex flex-col items-center gap-3">
        <div className="w-28 h-28 relative rounded-full border-4 border-white shadow-lg overflow-hidden">
          <Image
            src={
              user.image
                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${user.image.replace(/\\/g, "/")}`
                : "/images/noprofile.png"
            }
            alt={user.name || "profile picture"}
            fill
            className="object-cover rounded-full"
            unoptimized
          />
        </div>
        <h2 className="text-3xl font-bold text-[#4e342e]">{user.name}</h2>
        <span className="text-sm text-[#6d4c41] capitalize tracking-wide">{user.role}</span>
      </div>

      <div className="mt-6 space-y-3 text-[#4e342e]">
        <div className="flex items-start gap-2">
          <span className="font-semibold w-20">Email:</span>
          <span className="break-words text-sm">{user.email}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-semibold w-20">Age:</span>
          <span className="break-words text-sm">{user.age}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-semibold w-20">Phone:</span>
          <span className="break-words text-sm">{user.phone}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-semibold w-20">Skills:</span>
          <span className="break-words text-sm">
            {Array.isArray(user.skills) ? user.skills.join(", ") : user.skills}
          </span>
        </div>
      </div>

      {/* Show edit/delete only if user is viewing own profile */}
      {!userId && (
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => router.push(`/profile/edit`)}
            className="px-5 py-2 bg-[#6f4e37] text-white rounded-lg shadow hover:bg-[#5d4037] transition-all duration-200"
          >
            Edit Profile
          </button>
          <button
            onClick={() => router.push(`/profile/delete`)}
            className="px-5 py-2 bg-[#6f4e37] text-white rounded-lg shadow hover:bg-[#5d4037] transition-all duration-200"
          >
            Delete Profile
          </button>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => router.push("/")}
          className="px-5 py-2 bg-white/70 text-[#5d4037] border border-[#d7ccc8] rounded-lg shadow hover:bg-white hover:text-[#3e2723] transition-all duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ViewProfile;
