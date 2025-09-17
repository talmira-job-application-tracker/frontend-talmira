'use client'

import { useState } from "react"
import { Box, Typography, TextField, Button, Stack, Paper, IconButton, Link } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import SendIcon from "@mui/icons-material/Send"
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import Header from "@/components/Header"

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

  const onSubmit = (data:any) => {
    console.log(data)
    setSubmitted(true)
    reset()
  }

  return (
    <>
      <Header />

      {/* Hero Section */}
      <Box sx={{ py: 10, px: 2, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="bold" mb={2}>
          Contact TALMIRA
        </Typography>
        <Typography variant="h6" color="#d4cfcfff" maxWidth={600} mx="auto">
          Have questions or need support? Reach out to us, and we'll help you track and manage your job applications efficiently.
        </Typography>
      </Box>

      {/* Main Section */}
      <Box sx={{ maxWidth: 1200, mx: "auto", py: 4, px: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6 }}>
        
        {/* Left: Company Info */}
        <Paper sx={{ flex: 1, p: 5, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <Typography variant="h4" fontWeight="bold" mb={4}>
            Contact Information
          </Typography>

          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <LocationOnIcon color="primary" /> 
              <Typography>123 TALMIRA Street, Tech Park, Calicut, India</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <PhoneIcon color="primary" />
              <Typography>+91 98765 43210</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <EmailIcon color="primary" />
              <Typography>info@talmira.com</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <AccessTimeIcon color="primary" />
              <Typography>Mon - Fri: 9:00 AM - 6:00 PM</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} mt={4}>
            <IconButton component={Link} href="#" target="_blank" sx={{ color: '#4267B2' }}><FacebookIcon /></IconButton>
            <IconButton component={Link} href="#" target="_blank" sx={{ color: '#1DA1F2' }}><TwitterIcon /></IconButton>
            <IconButton component={Link} href="#" target="_blank" sx={{ color: '#0077B5' }}><LinkedInIcon /></IconButton>
          </Stack>
        </Paper>

        <Paper sx={{ flex: 1, p: 5, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
            Send a Message
          </Typography>

          {submitted && <Typography variant="body1" color="green" textAlign="center" mb={3}>Message sent successfully!</Typography>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Full Name" fullWidth error={!!errors.name} helperText={errors.name?.message} />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Email" fullWidth error={!!errors.email} helperText={errors.email?.message} />
                )}
              />
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Message" multiline rows={5} fullWidth error={!!errors.message} helperText={errors.message?.message} />
                )}
              />

              <Button type="submit" variant="contained" endIcon={<SendIcon />} sx={{ py: 1.8, borderRadius: 2 }}>
                Send Message
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>

      {/* Map */}
      <Box sx={{  mx: 2, borderRadius: 2, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.605703316647!2d75.7756!3d11.259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65d0a4ebaaaab%3A0x47aee7f9b988c123!2sCalicut%2C%20Kerala%2C%20India!5e0!3m2!1sen!2sus!4v1695012345678!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </Box>

    </>
  )
}

export default ContactUs
