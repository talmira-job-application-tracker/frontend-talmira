"use client";

import { listCompany } from "@/redux/slices/companySlice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ListCompanies = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { companies } = useSelector((state: RootState) => state.company);

  useEffect(() => {
    dispatch(listCompany());
  }, [dispatch]);

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        {companies.map((company) => {
          const logoPath = company.logo?.replace(/\\/g, "/");
          const logoUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${
            logoPath.startsWith("/") ? "" : "/"
          }${logoPath}`;

          return (
            <div
              key={company._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 backdrop-blur-md bg-white/80 border border-white/20 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4"
            >
              {/* Left: Logo + Name */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 relative rounded-xl overflow-hidden border border-black/30 flex-shrink-0">
                  <Image
                    src={logoUrl}
                    alt={company.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-black">
                  {company.name}
                </h3>
              </div>

              {/* Right: Button */}
              <button
                onClick={() => router.push(`/company/${company._id}`)}
                className="bg-teal-700 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition border border-white/30 w-full sm:w-auto"
              >
                View
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListCompanies;
