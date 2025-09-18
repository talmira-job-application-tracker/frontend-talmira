"use client"

import { InterviewType } from "@/types/interviewType";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "@/api";

const ViewInterview = () => {
    const {id} = useParams();
    const [interview, setInterview] = useState<InterviewType>();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get("token");
      if(!token) return;

      setLoading(true);

      api.get(`/interview`)
    })

  return (
    <div></div>
  )
}

export default ViewInterview;