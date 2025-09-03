'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Card,
  CardContent,
  Stack,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Button,
} from "@mui/material"
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import DashboardIcon from "@mui/icons-material/Dashboard"
import AssignmentIcon from "@mui/icons-material/Assignment"
import BusinessIcon from "@mui/icons-material/Business"
import WorkIcon from "@mui/icons-material/Work"
import PeopleIcon from "@mui/icons-material/People"
import AddIcon from "@mui/icons-material/Add"

import Header from "@/components/Header"
import ListApplications from "@/components/ListApplications"
import ListCompanies from "@/components/ListCompany"
import ListJob from "@/components/ListJob"
import ListUsers from "@/components/ListUsers"

// Dummy data
const applicationsData = [
  { month: "Jan", count: 40 },
  { month: "Feb", count: 55 },
  { month: "Mar", count: 70 },
  { month: "Apr", count: 90 },
]

const jobsData = [
  { name: "Design", value: 30},
  { name: "Tech", value:30 },
  { name: "Finance", value:25},
  { name: "Other", value: 15},
]

const COLORS = ["#309689", "#00796B", "#80CBC4", "#B2DFDB"]

const AdminDashboard = () => {
  const [selected, setSelected] = useState("dashboard")
  const [mounted, setMounted] = useState(false)
  const theme = useTheme()
  const isMobileQuery = useMediaQuery(theme.breakpoints.down("sm"))
  const isMobile = mounted && isMobileQuery

  useEffect(() => {
    setMounted(true)
  }, [])

  const mobileTabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "applications", label: "Applications" },
    { key: "companies", label: "Companies" },
    { key: "jobs", label: "Jobs" },
    { key: "users", label: "Users" },
  ]

  const renderContent = () => {
    if (selected === "dashboard") {
      return (
        <>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} flexWrap="wrap" mb={3}>
            {[
              { title: "Applications", value: 320 },
              { title: "Companies", value: 45 },
              { title: "Jobs", value: 120 },
              { title: "Users", value: 560 },
            ].map((stat, idx) => (
              <Box key={idx} flex={{ xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" }} minWidth={0}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "rgba(48,150,137,0.15)",
                    color: "#fff",
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={3} flexWrap="wrap">
            {/* Line Chart */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                p: 2,
                borderRadius: 2,
                backgroundColor: "rgba(29, 117, 105, 0.25)",
              }}
            >
              <Typography variant="h6" gutterBottom color="#fff">
                Applications Over Time
              </Typography>
              <Box sx={{ width: "100%", height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={applicationsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="month" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#309689" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Box>

            {/* Pie Chart */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                p: 2,
                borderRadius: 2,
                backgroundColor: "rgba(29, 117, 105, 0.25)",
              }}
            >
              <Typography variant="h6" gutterBottom color="#fff">
                Jobs by Category
              </Typography>
              <Box sx={{ width: "100%", height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={jobsData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      labelLine={false}
                      label={(props) => {
                      const { cx, cy, midAngle = 0, innerRadius = 0, outerRadius = 0, index } = props
                      const RADIAN = Math.PI / 180
                      const radius = innerRadius + (outerRadius - innerRadius) / 2
                      const x = cx + radius * Math.cos(-midAngle * RADIAN)
                      const y = cy + radius * Math.sin(-midAngle * RADIAN)
                      const item = jobsData[index as number]
                      return item ? (
                        <text
                          x={x}
                          y={y}
                          fill="#fff"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize={8}
                        >
                          {`${item.name} (${item.value})`}
                        </text>
                      ) : null
                    }}

                    >
                      {jobsData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </Stack>
        </>
      )
    }

    if (selected === "applications") return <ListApplications />

    if (selected === "companies")
      return (
        <Box sx={{ position: "relative", width: "100%", mt: 3 }}>
          <Link href="/add-company" passHref>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 10,
                backgroundColor: "#309689",
                "&:hover": { backgroundColor: "#26786d" },
              }}
            >
              Add Company
            </Button>
          </Link>

          <ListCompanies />
        </Box>
      )

    if (selected === "jobs") return <ListJob />
    if (selected === "users") return <ListUsers />
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header />

      <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", pt: 8 }}>
        {/* Sidebar for desktop */}
        {!isMobile && (
          <Box
            sx={{
              width: { md: "240px" },
              minHeight: "calc(100vh - 64px)",
              p: 2,
              borderRight: "1px solid rgba(255,255,255,0.1)",
              bgcolor: "transparent",
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2} color="#fff">
              Admin Panel
            </Typography>
            <List>
              {[
                { key: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
                { key: "applications", label: "Applications", icon: <AssignmentIcon /> },
                { key: "companies", label: "Companies", icon: <BusinessIcon /> },
                { key: "jobs", label: "Jobs", icon: <WorkIcon /> },
                { key: "users", label: "Users", icon: <PeopleIcon /> },
              ].map((item) => (
                <ListItemButton
                  key={item.key}
                  selected={selected === item.key}
                  onClick={() => setSelected(item.key)}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    color: "#ccc",
                    "&.Mui-selected": {
                      backgroundColor: "rgba(48,150,137,0.3)",
                      color: "#fff",
                    },
                  }}
                >
                  {item.icon}
                  <ListItemText primary={item.label} sx={{ ml: 1 }} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        )}

        {/* Main content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: "transparent",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          {/* Tabs for mobile */}
          {mounted && isMobile && (
            <Tabs
              value={selected}
              onChange={(e, value) => setSelected(value)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                mb: 2,
                bgcolor: "rgba(48,150,137,0.15)",
                borderRadius: 1,
              }}
            >
              {mobileTabs.map((tab) => (
                <Tab key={tab.key} label={tab.label} value={tab.key} />
              ))}
            </Tabs>
          )}

          {renderContent()}
        </Box>
      </Box>
    </Box>
  )
}

export default AdminDashboard








