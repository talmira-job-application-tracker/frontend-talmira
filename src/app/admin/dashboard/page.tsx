'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Card,
  CardContent,
  Stack,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  People as PeopleIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import api from "@/api";
import ListApplications from "@/components/ListApplications";
import ListCompanies from "@/components/ListCompany";
import ListJob from "@/components/ListJob";
import ListUsers from "@/components/ListUsers";
import CompanySearch from "@/components/CompanySearch";
import JobSearch from "@/components/JobSearchBar";
import ListInterviews from "@/components/ListInterviews";
import { ApplicationType } from "@/types/applicationType";

const COLORS = ["#309689", "#00796B", "#80CBC4", "#B2DFDB"];

// merge small slices into "Other"
const preparePieData = (data: { name: string; value: number }[]) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const threshold = total * 0.05;
  const main = data.filter(d => d.value >= threshold);
  const small = data.filter(d => d.value < threshold);
  const otherValue = small.reduce((acc, curr) => acc + curr.value, 0);
  if (otherValue > 0) main.push({ name: "Other", value: otherValue });
  return main;
};

const statCards = [
  { title: "Applications", key: "applications", icon: <AssignmentIcon /> },
  { title: "Companies", key: "companies", icon: <BusinessIcon /> },
  { title: "Jobs", key: "jobs", icon: <WorkIcon /> },
  { title: "Users", key: "applicants", icon: <PeopleIcon /> },
];

const sidebarTabs = [
  { key: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { key: "applications", label: "Applications", icon: <AssignmentIcon /> },
  { key: "companies", label: "Companies", icon: <BusinessIcon /> },
  { key: "jobs", label: "Jobs", icon: <WorkIcon /> },
  { key: "users", label: "Users", icon: <PeopleIcon /> },
  { key: "interviews", label: "Interviews", icon: <AssignmentIcon /> }, 
];

const mobileTabs = sidebarTabs.map(tab => ({ key: tab.key, label: tab.label }));


const AdminDashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isMobileQuery = useMediaQuery(theme.breakpoints.down("sm"));

  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState("dashboard");
  const [counts, setCounts] = useState({ applications: 0, jobs: 0, applicants: 0, companies: 0 });
  const [applicationsData, setApplicationsData] = useState<ApplicationType[]>([]);
  const [jobsData, setJobsData] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    const tabFromUrl = searchParams?.get("tab") || "dashboard";
    setSelected(tabFromUrl);
  }, [searchParams]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const countsRes = await api.get("/dashboard/counts");
        setCounts(countsRes.data.data);

        const appsRes = await api.get("/dashboard/applications-over-time");
        setApplicationsData(appsRes.data.data);

        const jobsRes = await api.get("/dashboard/jobs-by-industry");
        setJobsData(jobsRes.data.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };
    fetchDashboardData();
  }, []);

  const handleTabChange = (key: string) => {
    setSelected(key);
    router.push(`/admin/dashboard?tab=${key}`);
  };

  const renderContent = () => {
    if (selected === "dashboard") {
      return (
        <>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} flexWrap="wrap" mb={3}>
            {statCards.map((stat, idx) => (
              <Box key={idx} flex={{ xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" }}>
                <Card elevation={0} sx={{ borderRadius: 2, backgroundColor: "rgba(48,150,137,0.15)", color: "#fff" }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box sx={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#e5f7efff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {React.cloneElement(stat.icon, { sx: { fontSize: 18, color: "#309689" } })}
                      </Box>
                      <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>{stat.title}</Typography>
                    </Box>
                    <Typography variant="h5" fontWeight="bold" mt={1}>{counts[stat.key as keyof typeof counts]}</Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Stack>

          {/* Charts */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3} flexWrap="wrap">
            {/* Line Chart */}
            <Box sx={{ flex: 1, p: 2, borderRadius: 2, backgroundColor: "rgba(29, 117, 105, 0.25)" }}>
              <Typography variant="h6" gutterBottom color="#fff">Applications Over Time</Typography>
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
            <Box sx={{ flex: 1, p: 2, borderRadius: 2, backgroundColor: "rgba(29, 117, 105, 0.25)" }}>
              <Typography variant="h6" gutterBottom color="#fff">Jobs by Category</Typography>
              <Box sx={{ width: "100%", height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={preparePieData(jobsData)} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false}>
                      {preparePieData(jobsData).map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string) => [`${value}`, name]}
                      contentStyle={{ backgroundColor: "#1d7569", borderRadius: 4, color: "#fff", padding: "4px 8px", fontSize: "10px", minWidth: 0 }}
                      itemStyle={{ color: "#fff", fontSize: "10px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </Stack>
        </>
      );
    }

    if (selected === "applications") return <ListApplications />;
    if (selected === "companies") return (
      <Box sx={{ mt: 3 }}>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" justifyContent="space-between" spacing={2} mb={2}>
          <Box sx={{ flexGrow: 1, maxWidth: { xs: "100%", sm: "70%" } }}><CompanySearch /></Box>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ backgroundColor: "#309689", "&:hover": { backgroundColor: "#26786d" } }} component={Link} href="/company/add">Add Company</Button>
        </Stack>
        <ListCompanies />
      </Box>
    );
    if (selected === "jobs") return (
      <Box sx={{ mt: 3 }}>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" justifyContent="space-between" spacing={2} mb={2}>
          <Box sx={{ flexGrow: 1, maxWidth: { xs: "100%", sm: "70%" } }}><JobSearch /></Box>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ backgroundColor: "#309689", "&:hover": { backgroundColor: "#26786d" } }} component={Link} href="/job/add">Add Job</Button>
        </Stack>
        <ListJob />
      </Box>
    );
    if (selected === "users") return <ListUsers />;
    if (selected === "interviews") return <ListInterviews />;
  };



  if (!mounted) return null;

  const isMobile = mounted && isMobileQuery;

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", pt: 8 }}>
        {/* Sidebar */}
        {!isMobile && (
          <Box sx={{ width: { md: 240 }, p: 2, borderRight: "1px solid rgba(255,255,255,0.1)" }}>
            <Typography variant="h6" fontWeight="bold" mb={2} color="#fff">Admin Panel</Typography>
            <List>
              {sidebarTabs.map(item => (
                <ListItemButton key={item.key} selected={selected === item.key} onClick={() => handleTabChange(item.key)}
                  sx={{ borderRadius: 1, mb: 1, color: "#ccc", "&.Mui-selected": { backgroundColor: "rgba(48,150,137,0.3)", color: "#fff" } }}>
                  {item.icon}<ListItemText primary={item.label} sx={{ ml: 1 }} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        )}

        <Box sx={{ flexGrow: 1, p: 2, minHeight: "calc(100vh - 64px)" }}>
          {isMobile && (
            <Tabs value={selected} onChange={(e, value) => handleTabChange(value)} variant="scrollable" scrollButtons="auto"
              sx={{ mb: 2, bgcolor: "rgba(48,150,137,0.15)", borderRadius: 1 }}>
              {mobileTabs.map(tab => <Tab key={tab.key} label={tab.label} value={tab.key} />)}
            </Tabs>
          )}
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
