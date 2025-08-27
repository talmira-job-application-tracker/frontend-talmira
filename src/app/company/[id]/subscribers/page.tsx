"use client";

import ListSubscribers from "@/components/ListSubscribers";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
    const { id } = useParams();
    const companyId = id as string;
  return (
    <div>
      <ListSubscribers companyId={companyId} />
    </div>
  );
}
