// "use client";

// import Header from "@/components/Header";
// import Cookies from "js-cookie";
// import { useEffect, useState } from "react";
// import Footer from "@/components/Footer";
// import AutoSlider from "@/components/Banner";
// import HomePage from "@/components/HomePage";
// import { useRouter } from "next/navigation";
// import AboutUs from "./about-us/page";

// export default function Home() {
//   const [token, setToken] = useState<string | null>(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const t = Cookies.get("token");
//     console.log(t, 'token...')
//     const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;

//     setToken(t || null);
//     setIsAdmin(user?.role === "admin");

//     if (t && user?.role === "admin") {
//       router.push("/admin/dashboard");
//     }
//   }, [router]);

//   return (
//     <div className='flex flex-col justify-items-start gap-10'>
//       <Header />

//       {!token && 
//       <>
//       <AutoSlider /> 
//       <AboutUs/>
//       </>
//       }

//       {token && !isAdmin && <HomePage />}

//       <Footer />
//     </div>
//   );
// }


// 'use client';

// import Header from "@/components/Header";
// import Cookies from "js-cookie";
// import { useEffect, useState } from "react";
// import Footer from "@/components/Footer";
// import AutoSlider from "@/components/Banner";
// import HomePage from "@/components/HomePage";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";

// export default function Home() {
//   const [token, setToken] = useState<string | null>(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const router = useRouter();

//   const features = [
//     { icon: null, title: "Smart Job Matching", desc: "Get alerts for jobs that match your skills, interests, and goals." },
//     { icon: null, title: "Interactive Timeline", desc: "Visualize applications, interviews, and follow-ups at a glance." },
//     { icon: null, title: "Collaboration Tools", desc: "Share progress with mentors or career coaches safely." },
//   ];

//   useEffect(() => {
//     const t = Cookies.get("token");
//     const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;

//     setToken(t || null);
//     setIsAdmin(user?.role === "admin");

//     if (t && user?.role === "admin") {
//       router.push("/admin/dashboard");
//     }
//   }, [router]);

//   const fadeInUp = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   };

//   return (
//     <div className='flex flex-col justify-items-start'>

//       {!token && (
//         <>
//           <AutoSlider />

//           {/* About Talmira Section */}
//           <motion.section
//             initial="hidden"
//             animate="visible"
//             variants={fadeInUp}
//             className="relative z-10 bg-gradient-to-br from-[#0d1f1e] via-[#103c37] to-[#0a0a0a] px-6 py-24 text-center"
//           >
//             <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#309689] to-[#4fd1c5] mb-4">
//               About Talmira
//             </h1>
//             <p className="max-w-2xl mx-auto text-gray-300 text-lg md:text-xl">
//               Organize, track, and succeed in your job search. Talmira helps you manage opportunities strategically and stress-free.
//             </p>
//           </motion.section>

//           {/* Features Grid */}
//           <section className="relative z-20 -mt-16">
//             <div className="bg-[#0d1f1e]">
//               <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {features.map((feature, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true, amount: 0.3 }}
//                     transition={{ duration: 0.6, delay: idx * 0.1 }}
//                     className="bg-black/30 backdrop-blur-md rounded-2xl p-6 flex flex-col items-start gap-3 transform hover:-translate-y-2 hover:scale-105 transition duration-300 shadow-lg"
//                   >
//                     <div className="text-[#309689]">{feature.icon}</div>
//                     <h3 className="text-2xl font-semibold">{feature.title}</h3>
//                     <p className="text-gray-300 text-sm md:text-base">{feature.desc}</p>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </section>

    
//           <motion.section
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={fadeInUp}
//             className="relative z-30 bg-gradient-to-tr from-[#103c37] to-[#0a0a0a] skew-y-[-3deg] py-32"
//           >
//             <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
//               <div className="flex-1 space-y-6">
//                 <h2 className="text-4xl font-bold text-[#4fd1c5]">Our Mission</h2>
//                 <p className="text-gray-300 text-lg">
//                   We aim to make job searching structured, stress-free, and smarter. 
//                   Talmira helps users apply strategically and track progress efficiently.
//                 </p>
//               </div>
//               <div className="flex-1">
//                 <motion.img
//                   src="/images/ourmission.svg"
//                   alt="Mission"
//                   className="hover:rotate-[-3deg] transition-transform duration-500"
//                   initial={{ opacity: 0, x: 100 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true, amount: 0.3 }}
//                   transition={{ duration: 0.6 }}
//                 />
//               </div>
//             </div>
//           </motion.section>
//         </>
//       )}

//       {token && !isAdmin && <HomePage />}

//       <Footer />
//     </div>
//   );
// }

"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AutoSlider from "@/components/Banner";
import HomePage from "@/components/HomePage";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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

          {/* About Talmira */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="relative z-10 bg-gradient-to-br from-[#0d1f1e] via-[#103c37] to-[#0a0a0a] px-6 py-24 text-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#309689] to-[#4fd1c5] mb-4">
              About Talmira
            </h1>
            <p className="max-w-2xl mx-auto text-gray-300 text-lg md:text-xl">
              Organize, track, and succeed in your job search. Talmira helps you manage opportunities strategically and stress-free.
            </p>
          </motion.section>

          {/* Features */}
          <section className="relative z-20 -mt-16">
            <div className="bg-[#0d1f1e]">
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
            </div>
          </section>
        </>
      )}

      {user && user.role !== "admin" && <HomePage />}

    </div>
  );
}
export default Home
