"use client";

import { listCompany } from "@/redux/slices/companySlice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ListCompanies = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { companies } = useSelector((state: RootState) => state.company);

  useEffect(() => {
    dispatch(listCompany());
  }, [dispatch]);

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
