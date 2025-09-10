'use client'

import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { motion } from "framer-motion"
import SendIcon from "@mui/icons-material/Send"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  email: yup.string().required("Email is required").email("Invalid email address"),
  message: yup.string().required("Message is required").min(10, "Message must be at least 10 characters"),
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
      <Box sx={{ minHeight: "100vh", pb: 6 }}>
        <Header />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 15,
            px: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ width: "100%", maxWidth: 600 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                backgroundColor: "rgba(14, 70, 62, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography variant="h4" fontWeight="bold" color="#091816ff" mb={3} textAlign="center">
                Contact Us
              </Typography>

              {submitted && (
                <Typography
                  variant="body1"
                  color="#043f38ff"
                  textAlign="center"
                  mb={2}
                  sx={{ fontWeight: "bold" }}
                >
                  Your message has been sent! 
                </Typography>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Name"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        sx={{ backgroundColor: "rgba(229, 245, 239, 0.95)", borderRadius: 1 }}
                    />
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        sx={{ backgroundColor: "rgba(229, 245, 239, 0.95)", borderRadius: 1 }}
                      />
                    )}
                  />

                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Message"
                        multiline
                        rows={4}
                        fullWidth
                        error={!!errors.message}
                        helperText={errors.message?.message}
                        sx={{ backgroundColor: "rgba(229, 245, 239, 0.95)", borderRadius: 1 }}
                    />
                    )}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                    sx={{
                      backgroundColor: "#309689",
                      "&:hover": { backgroundColor: "#26786d" },
                      fontWeight: "bold",
                      py: 1.5,
                    }}
                  >
                    Send Message
                  </Button>
                </Stack>
              </form>
            </Paper>
          </motion.div>
        </Box>
      </Box>
    </>
  )
}

export default ContactUs
