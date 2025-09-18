"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/api";
import toast from "react-hot-toast";
import { Calendar, MapPin, Monitor, NotebookPen } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  mode: yup.string().oneOf(["Online", "In-person", "Phone"]).required("Mode is required"),
  location: yup.string().when("mode", {
    is: (val: string) => val === "In-person",
    then: (schema) => schema.required("Location is required for in-person interviews"),
    otherwise: (schema) => schema.notRequired(),
  }),
  notes: yup.string().max(500, "Notes cannot exceed 500 characters"),
});

type FormData = yup.InferType<typeof schema>;

const ScheduleInterviewPage = () => {
  const router = useRouter();
  const params = useParams();
  const applicationId = params.id;

  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await api.get(`/application/${applicationId}`);
        setApplication(res.data.data);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to fetch application");
      }
    };
    fetchApplication();
  }, [applicationId]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const scheduledAt = new Date(`${data.date}T${data.time}`);
      await api.post("/interview/schedule", {
        applicationId,
        scheduledAt,
        mode: data.mode,
        location: data.location,
        notes: data.notes,
      });
      toast.success("Interview scheduled successfully");
      router.push("/admin/dashboard?tab=applications");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to schedule interview");
    } finally {
      setLoading(false);
    }
  };

  if (!application)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Loading application details...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center mt-12 items-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-gray-200"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Schedule Interview
          </h2>
          <p className="text-gray-600 text-sm">
            For <span className="font-semibold text-teal-600">{application?.user?.name}</span> —{" "}
            {application?.job?.title} at {application?.job?.company?.name}
          </p>
        </div>

        {/* Date */}
        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
        <div className="relative mb-2">
          <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="date"
            {...register("date")}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        {errors.date && <p className="text-red-500 text-sm mb-3">{errors.date.message}</p>}

        {/* Time */}
        <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
        <div className="relative mb-2">
          <NotebookPen className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="time"
            {...register("time")}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        {errors.time && <p className="text-red-500 text-sm mb-3">{errors.time.message}</p>}

        {/* Mode */}
        <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
        <div className="relative mb-2">
          <Monitor className="absolute left-3 top-3 text-gray-400" size={18} />
          <select
            {...register("mode")}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="Online">Online</option>
            <option value="In-person">In-person</option>
            <option value="Phone">Phone</option>
          </select>
        </div>
        {errors.mode && <p className="text-red-500 text-sm mb-3">{errors.mode.message}</p>}

        {/* Location */}
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <div className="relative mb-2">
          <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            {...register("location")}
            placeholder="e.g. Zoom link or office address"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        {errors.location && <p className="text-red-500 text-sm mb-3">{errors.location.message}</p>}

        {/* Notes */}
        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
        <textarea
          {...register("notes")}
          placeholder="Add extra details (optional)"
          className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 mb-2"
          rows={3}
        />
        {errors.notes && <p className="text-red-500 text-sm mb-3">{errors.notes.message}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold shadow-md transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-teal-600 hover:bg-teal-700 text-white"
          }`}
        >
          {loading ? "Scheduling..." : "Schedule Interview"}
        </button>
      </form>
    </div>
  );
};

export default ScheduleInterviewPage;
