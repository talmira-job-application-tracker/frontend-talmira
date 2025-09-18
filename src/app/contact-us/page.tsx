'use client'

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Header from "@/components/Header"
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi"
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa"

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(2),
  email: yup.string().required("Email is required").email(),
  message: yup.string().required("Message is required").min(10),
})

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false)
  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  })

  const onSubmit = (data: any) => {
    console.log(data)
    setSubmitted(true)
    reset()
  }

  return (
    <>
      <Header />

      {/* Hero */}
      <div className="py-12 text-center mt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-500 mb-2">Contact TALMIRA</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Have questions or need support? Reach out to us, and we'll help you track and manage your job applications efficiently.
        </p>
      </div>

      {/* Cards Section */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Company Info Card */}
        <div className="bg-black/50 backdrop-blur-lg p-8 rounded-2xl shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-teal-500 mb-6">Company Info</h2>
            <div className="space-y-7 text-gray-200 text-xl">
              <div className="flex items-center gap-3"><FiMapPin className="text-teal-500"/>123 TALMIRA Street, Tech Park, Calicut, India</div>
              <div className="flex items-center gap-3"><FiPhone className="text-teal-500"/>+91 98765 43210</div>
              <div className="flex items-center gap-3"><FiMail className="text-teal-500"/>info@talmira.com</div>
              <div className="flex items-center gap-3"><FiClock className="text-teal-500"/>Mon - Fri: 9:00 AM - 6:00 PM</div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <a href="#" target="_blank" className="text-blue-700 hover:text-blue-500"><FaFacebookF/></a>
            <a href="#" target="_blank" className="text-blue-400 hover:text-blue-200"><FaTwitter/></a>
            <a href="#" target="_blank" className="text-blue-600 hover:text-blue-400"><FaLinkedinIn/></a>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="bg-black/50 backdrop-blur-lg p-8 rounded-2xl shadow-lg flex flex-col">
          <h2 className="text-3xl font-bold text-teal-500 mb-6 text-center">Send a Message</h2>

          {submitted && <p className="text-green-500 text-center mb-4">Message sent successfully!</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 rounded-lg bg-black/30 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              )}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-lg bg-black/30 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              )}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={5}
                  placeholder="Message"
                  className="w-full p-3 rounded-lg bg-black/30 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              )}
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-teal-500 to-green-500 hover:opacity-90 text-white font-semibold flex items-center justify-center gap-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map */}
      <div className="mx-4 mb-12 rounded-2xl overflow-hidden shadow-lg h-72 md:h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.605703316647!2d75.7756!3d11.259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65d0a4ebaaaab%3A0x47aee7f9b988c123!2sCalicut%2C%20Kerala%2C%20India!5e0!3m2!1sen!2sus!4v1695012345678!5m2!1sen!2sus"
          width="100%"
          height="100%"
          className="border-0"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </>
  )
}

export default ContactUs
