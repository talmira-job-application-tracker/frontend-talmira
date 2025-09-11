'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import api from '@/api' 

const banners = [
  {
    id: 1,
    src: '/images/banner1.jpg',
    title: 'Welcome to TALMIRA',
    subtitle: 'Your smart way to track and manage job applications',
  },
  {
    id: 2,
    src: '/images/banner2.jpg',
    title: 'Stay Organized',
    subtitle: 'Never miss an opportunity with alerts and reminders',
  },
  {
    id: 3,
    src: '/images/banner4.jpg',
    title: 'Land Your Dream Job',
    subtitle: 'One platform to manage applications, alerts, and progress',
  },
]

const AutoSlider = () => {
  const [current, setCurrent] = useState(0)

  
  const [counts, setCounts] = useState({
    jobs: 0,
    applicants: 0,
    companies: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

    
  useEffect(() => {
    api
      .get("/dashboard/counts")
      .then((res) => {
        setCounts({
          jobs: res.data.data.jobs,
          applicants: res.data.data.applicants,
          companies: res.data.data.companies,
        })
      })
      .catch((err) => {
        console.error("Failed to fetch counts", err)
      })
  }, [])

  return (
    <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden shadow-lg">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={banner.src}
            alt={banner.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-[#fff] mb-2 drop-shadow">
              {banner.title}
            </h2>
            <p className="text-sm md:text-lg text-white/90 drop-shadow mb-16">
              {banner.subtitle}
            </p>

            {/* icons section with dynamic counts */}
            <div className="flex flex-row gap-12">
              <div className="flex flex-row gap-1 text-left">
                <div className="h-10 w-10 bg-[#309689] rounded-full flex items-center justify-center">
                  <img src="/icons/job-icon.svg" className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-white font-bold">{counts.jobs}</p>
                  <p className="text-white/80">Jobs</p>
                </div>
              </div>

              <div className="flex flex-row gap-1 text-left">
                <div className="h-10 w-10 bg-[#309689] rounded-full flex items-center justify-center">
                  <img src="/icons/users-icon.svg" className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-white font-bold">{counts.applicants}</p>
                  <p className="text-white/80">Applicants</p>
                </div>
              </div>

              <div className="flex flex-row gap-1 text-left">
                <div className="h-10 w-10 bg-[#309689] rounded-full flex items-center justify-center">
                  <img src="/icons/company-icon.svg" className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-white font-bold">{counts.companies}</p>
                  <p className="text-white/80">Companies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AutoSlider
