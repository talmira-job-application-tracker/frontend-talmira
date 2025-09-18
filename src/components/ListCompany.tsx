"use client";

import api from "@/api"; 
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { CompanyType } from "@/types/companyType";

const ListCompanies = () => {
  const router = useRouter();
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const fetchCompanies = async (pageNum: number, append = false) => {
    try {
      setLoading(true);
      const res = await api.get(`/company/list?page=${pageNum}&limit=10`);
      setCompanies((prev) => (append ? [...prev, ...res.data.data] : res.data.data));
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  };

  // initial fetch
  useEffect(() => {
    fetchCompanies(1, false);
  }, []);

  // Infinite scroll on mobile
  useInfiniteScroll(() => {
    if (page < totalPages && !loading) {
      fetchCompanies(page + 1, true);
    }
  }, isMobile);

  if (loading && companies.length === 0)
    return <p className="text-gray-700 text-center mt-10">Loading companies...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (companies.length === 0)
    return <p className="text-gray-500 text-center mt-10">No companies found.</p>;

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        {companies.map((company) => {
          const logoPath = company.logo ? company.logo.replace(/\\/g, "/") : null;
          const logoUrl = logoPath
            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${logoPath.startsWith("/") ? "" : "/"}${logoPath}`
            : "/default-logo.png";

          return (
            <div
              key={company._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-white/30 to-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 relative rounded-xl overflow-hidden border border-black/30 flex-shrink-0">
                  <Image src={logoUrl} alt={company.name} fill className="object-cover" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-black">{company.name}</h3>
              </div>

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

      {/* desktop pagination */}
      {!isMobile && (
        <div className="flex justify-center mt-8">
          <Pagination page={page} totalPages={totalPages} onPageChange={(p) => fetchCompanies(p, false)} />
        </div>
      )}
    </div>
  );
};

export default ListCompanies;
