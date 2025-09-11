"use client";

import AutoSlider from "@/components/Banner";
import HomePage from "@/components/HomePage";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Bell } from "lucide-react";
import Image from "next/image";

export const Home = () => {
  const { user } = useAuth();   
  const router = useRouter();

  useEffect(() => {
    if (user?.role === "admin") {
      router.push("/admin/dashboard");
    }
  }, [user, router]);

  const features = [
    { icon: null, title: "Smart Job Matching", desc: "Get alerts for jobs that match your skills, interests, and goals." },
    { icon: null, title: "Interactive Timeline", desc: "Visualize applications, interviews, and follow-ups at a glance." },
    { icon: null, title: "Collaboration Tools", desc: "Share progress with mentors or career coaches safely." },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex flex-col justify-items-start">
      {!user && (
        <>
          <AutoSlider />

          {/* How It Works / Steps Section */}
          <section className="relative z-15 px-6 py-24 bg-white/40 text-white">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
              {/* Left side: feature cards */}
              <div className="flex-1 flex flex-col gap-8">
                <div className="flex items-center gap-4 bg-[#309689]/20 p-6 rounded-2xl shadow-lg">
                  <Search className="w-10 h-10 text-[#309689]" />
                  <div>
                    <h3 className="text-2xl font-semibold">Search Jobs</h3>
                    <p className="text-gray-200 text-sm md:text-base">
                      Explore thousands of opportunities from top companies in one place.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#309689]/20 p-6 rounded-2xl shadow-lg">
                  <FileText className="w-10 h-10 text-[#309689]" />
                  <div>
                    <h3 className="text-2xl font-semibold">Track Applications</h3>
                    <p className="text-gray-200 text-sm md:text-base">
                      Keep all your applications organized and stay on top of deadlines.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#309689]/20 p-6 rounded-2xl shadow-lg">
                  <Bell className="w-10 h-10 text-[#309689]" />
                  <div>
                    <h3 className="text-2xl font-semibold">Get Notified</h3>
                    <p className="text-gray-200 text-sm md:text-base">
                      Receive timely alerts for interviews, status updates, and opportunities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right side: illustration / hero image */}
              <div className="flex-1">
                <div className="w-full h-96 relative rounded-3xl overflow-hidden bg-[#07332f]/40 flex items-center justify-center">
                  <Image
                    src="/images/banner1.jpg"
                    alt="Banner"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>




          {/* About Talmira */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="relative z-10 bg-gradient-to-r from-[#309689] to-[#07332f] px-6 py-24 text-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white/30 bg-clip-text  mb-4">
              About Talmira
            </h1>
            <p className="max-w-2xl mx-auto text-white/60 text-lg md:text-xl">
              Organize, track, and succeed in your job search. Talmira helps you manage opportunities strategically and stress-free.
            </p>
          </motion.section>

          {/* Features */}
          <section className="relative z-20 bg-gradient-to-r from-[#309689] to-[#07332f] -mt-16">
            {/* <div className="bg-[#0d1f1e]"> */}
              <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="bg-black/30 backdrop-blur-md rounded-2xl p-6 flex flex-col items-start gap-3 transform hover:-translate-y-2 hover:scale-105 transition duration-300 shadow-lg"
                  >
                    <div className="text-[#309689]">{feature.icon}</div>
                    <h3 className="text-2xl font-semibold">{feature.title}</h3>
                    <p className="text-gray-300 text-sm md:text-base">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            {/* </div> */}
          </section>
        </>
      )}

      {user && user.role !== "admin" && <HomePage />}

    </div>
  );
}
export default Home
