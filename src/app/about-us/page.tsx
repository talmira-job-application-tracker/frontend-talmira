"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bell, FileText, Users, BarChart2, Star } from "lucide-react";

const AboutUs = () => {
  const features = [
    { icon: <Bell size={28} />, title: "Smart Job Matching", desc: "Get alerts for jobs that match your skills, interests, and goals." },
    { icon: <FileText size={28} />, title: "Interactive Timeline", desc: "Visualize applications, interviews, and follow-ups at a glance." },
    { icon: <Users size={28} />, title: "Collaboration Tools", desc: "Share progress with mentors or career coaches safely." },
    { icon: <BarChart2 size={28} />, title: "Dashboard Insights", desc: "Track deadlines, responses, and interview schedules easily." },
    { icon: <Star size={28} />, title: "Premium Recommendations", desc: "Receive industry trends and personalized upskilling tips." },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative z-10 bg-gradient-to-br from-[#0d1f1e] via-[#103c37] to-[#0a0a0a] px-6 py-32 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#309689] to-[#4fd1c5] mb-6">
          About Talmira
        </h1>
        <p className="max-w-2xl mx-auto text-gray-300 text-lg md:text-xl">
          Organize, track, and succeed in your job search. Talmira helps you manage opportunities strategically and stress-free.
        </p>
      </motion.section>

      {/* Features Grid */}
      <section className="relative -mt-24 z-20">
        <div className="skew-y-3 bg-[#0d1f1e]">
          <div className="skew-y-[-3deg] max-w-6xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-black/30 backdrop-blur-md rounded-2xl p-8 flex flex-col items-start gap-4 transform hover:-translate-y-3 hover:scale-105 transition duration-300 shadow-lg"
              >
                <div className="text-[#309689]">{feature.icon}</div>
                <h3 className="text-2xl font-semibold">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Story Split */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="relative z-30 bg-gradient-to-tr from-[#103c37] to-[#0a0a0a] skew-y-[-3deg] py-32"
      >
        <div className=" max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold text-[#4fd1c5]">Our Mission</h2>
            <p className="text-gray-300 text-lg">
              We aim to make job searching structured, stress-free, and smarter. 
              Talmira helps users apply strategically and track progress efficiently.
            </p>
          </div>
          <div className="flex-1">
            <motion.img
              src="/images/ourmission.svg"
              alt="Mission"
              className=" hover:rotate-[-3deg] transition-transform duration-500"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="relative z-40 py-32 max-w-6xl mx-auto px-6 text-center"
      >
        <h2 className="text-4xl font-bold text-[#309689] mb-16">
          Who We Are
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          A passionate team of developers and career enthusiasts, Talmira was built to solve real-world job search challenges. 
          Every feature is designed with the user in mind, combining simplicity and smart automation.
        </p>
      </motion.section>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-gray-400 text-center text-sm mt-12 mb-12"
      >
        © 2025 Talmira. Built with care for your career.
      </motion.p>

      {/* Decorative elements */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#309689]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[500px] h-[500px] bg-[#4fd1c5]/10 rounded-full blur-2xl"></div>
    </main>
  );
};

export default AboutUs;
