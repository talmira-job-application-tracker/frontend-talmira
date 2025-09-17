import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/ReduxProvider";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import Script from "next/script";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Talmira",
  description: "Job tracking app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Maps + Places API */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${figtree.className} antialiased bg-gradient-to-br from-[#366157] to-[#e6fffa] min-h-screen flex flex-col`}
      >
        <ReduxProvider>
          <AuthProvider>
            <Toaster position="top-right" reverseOrder={false} />
            <Header />

          {/* Main content grows to push footer down */}
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </ReduxProvider>

      <Script
        src="https://platform-api.sharethis.com/js/sharethis.js#property=68c8edfe8a53d7666a669edb&product=sop"
        strategy="afterInteractive"
        async
      />

    </body>
  </html>
  )
}
