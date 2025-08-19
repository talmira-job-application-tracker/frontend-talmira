"use client";

import api from "@/api";
import { CompanyType } from "@/types/companyType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ListCompanies = () => {
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    api.get('/company/listallcompanies')
      .then((res) => {
        setCompanies(res.data.data);
      })
      .catch((err) => {
        setError("Failed to load companies");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h5>Loading...</h5>;
  if (error) return <h5>{error}</h5>;
  if (companies.length === 0) return <h5>No companies found.</h5>;

  return (
    <div>
      {companies.map((company) => {
        const logoPath = company.logo?.replace(/\\/g, "/");
        const logoUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${logoPath.startsWith("/") ? "" : "/"}${logoPath}`;

        return (
          <div key={company._id}>
            <Image
              src={logoUrl}
              alt={company.name}
              width={100}
              height={100}
            />
            <h3>{company.name}</h3>
            <p>{company.description}</p>
            <button onClick={() => router.push(`/company/${company._id}`)}>
              View Company
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ListCompanies;
