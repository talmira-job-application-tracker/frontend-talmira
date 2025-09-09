

import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import "./globals.css"
import { ReduxProvider } from "@/redux/ReduxProvider"
import { Toaster } from "react-hot-toast"
import Header from "@/components/Header"
import { AuthProvider } from "@/context/AuthContext"
import Footer from "@/components/Footer"

const figtree = Figtree({ subsets: ["latin"] })


export const metadata: Metadata = {
  title: "Talmira",
  description: "Job tracking app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <html lang="en">
    //   <body className={` ${figtree.className} antialiased bg-gradient-to-br from-[#366157] to-[#e6fffa] min-h-screen`}>
    //     <ReduxProvider>
    //       <AuthProvider>
    //       <Toaster position="top-right" reverseOrder={false} />
    //       <Header/>
    //       {children}
    //       <Footer/>
    //       </AuthProvider>
    //     </ReduxProvider>
    //   </body>
    // </html>
   <html lang="en">
  <body
    className={` ${figtree.className} antialiased bg-gradient-to-br from-[#366157] to-[#e6fffa] min-h-screen flex flex-col`}
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
  </body>
</html>


  )
}
