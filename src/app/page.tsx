
"use client";

import AutoSlider from "@/components/Banner";
import HomePage from "@/components/HomePage";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Bell } from "lucide-react";
import Image from "next/image";

interface FeatureCardProps {
  icon: React.ReactNode; 
  title: string;
  desc: string;
  delay?: number;
}

const features = [
  { icon: <Search />, title: "Smart Job Matching", desc: "Get alerts for jobs that match your skills, interests, and goals." },
  { icon: <FileText />, title: "Interactive Timeline", desc: "Visualize applications, interviews, and follow-ups at a glance." },
  { icon: <Bell />, title: "Collaboration Tools", desc: "Share progress with mentors or career coaches safely." },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay }}
    className="bg-black/30 backdrop-blur-md rounded-2xl p-6 flex flex-col items-start gap-3 transform hover:-translate-y-2 hover:scale-105 transition duration-300 shadow-lg"
  >
    <div className="text-[#309689]">{icon}</div>
    <h3 className="text-2xl font-semibold">{title}</h3>
    <p className="text-gray-300 text-sm md:text-base">{desc}</p>
  </motion.div>
);

export const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role === "admin") {
      router.push("/admin/dashboard");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col justify-items-start">
      {!user && (
        <>
          <AutoSlider />

          <section className="relative z-15 px-6 py-24 bg-white/40 text-white">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 flex flex-col gap-8">
                <FeatureCard
                  icon={<Search className="w-10 h-10 text-[#309689]" />}
                  title="Search Jobs"
                  desc="Explore thousands of opportunities from top companies in one place."
                />
                <FeatureCard
                  icon={<FileText className="w-10 h-10 text-[#309689]" />}
                  title="Track Applications"
                  desc="Keep all your applications organized and stay on top of deadlines."
                />
                <FeatureCard
                  icon={<Bell className="w-10 h-10 text-[#309689]" />}
                  title="Get Notified"
                  desc="Receive timely alerts for interviews, status updates, and opportunities."
                />
              </div>

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

          <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="relative z-10 bg-gradient-to-r from-[#309689] to-[#07332f] px-6 py-24 text-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white/30 bg-clip-text mb-4">
              About Talmira
            </h1>
            <p className="max-w-2xl mx-auto text-white/60 text-lg md:text-xl">
              Organize, track, and succeed in your job search. Talmira helps you manage opportunities strategically and stress-free.
            </p>
          </motion.section>

          <section className="relative z-20 bg-gradient-to-r from-[#309689] to-[#07332f] -mt-16">
            <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <FeatureCard
                  key={idx}
                  icon={feature.icon}
                  title={feature.title}
                  desc={feature.desc}
                  delay={idx * 0.1}
                />
              ))}
            </div>
          </section>

          <section className="px-6 py-24 bg-[#3096891A] text-white">
            <h2 className="text-4xl font-bold mb-12 text-center">FAQs</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              
              <details className="bg-black/20 p-4 rounded-lg">
                <summary className="font-semibold cursor-pointer">How do I receive job alerts?</summary>
                <p className="mt-2 text-gray-300">
                  You will get notifications for new jobs that match your skills and profile. Make sure your profile is up-to-date.
                </p>
              </details>

              <details className="bg-black/20 p-4 rounded-lg">
                <summary className="font-semibold cursor-pointer">How do I apply for a job?</summary>
                <p className="mt-2 text-gray-300">
                  Find a job that interests you, click "Apply", and fill out your profile information. You can upload your resume for faster applications.
                </p>
              </details>

              <details className="bg-black/20 p-4 rounded-lg">
                <summary className="font-semibold cursor-pointer">Can I track my applications?</summary>
                <p className="mt-2 text-gray-300">
                  Yes! Talmira allows you to track all your applications, see their status, and stay on top of deadlines.
                </p>
              </details>

              <details className="bg-black/20 p-4 rounded-lg">
                <summary className="font-semibold cursor-pointer">Will I get notifications for updates?</summary>
                <p className="mt-2 text-gray-300">
                  Yes, Talmira sends timely alerts for interview calls, status updates, and other important events.
                </p>
              </details>

              <details className="bg-black/20 p-4 rounded-lg">
                <summary className="font-semibold cursor-pointer">Is my personal data safe?</summary>
                <p className="mt-2 text-gray-300">
                  Absolutely. We use encryption and industry-standard security practices to protect your data.
                </p>
              </details>

              <details className="bg-black/20 p-4 rounded-lg">
                <summary className="font-semibold cursor-pointer">Can I edit my profile information?</summary>
                <p className="mt-2 text-gray-300">
                  Yes, you can update your profile, skills, and personal information anytime from your account settings.
                </p>
              </details>

            </div>
          </section>

        </>
      )}

      {user && user.role !== "admin" && <HomePage />}
    </div>
  );
};

export default Home;
