// 'use client';

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   Box,
//   Typography,
//   List,
//   ListItemButton,
//   ListItemText,
//   Card,
//   CardContent,
//   Stack,
//   Tabs,
//   Tab,
//   Button,
// } from "@mui/material";
// import {
//   Dashboard as DashboardIcon,
//   Assignment as AssignmentIcon,
//   Business as BusinessIcon,
//   Work as WorkIcon,
//   People as PeopleIcon,
//   Add as AddIcon,
// } from "@mui/icons-material";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useSearchParams, useRouter } from "next/navigation";
// import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

// import api from "@/api";
// import ListApplications from "@/components/ListApplications";
// import ListCompanies from "@/components/ListCompany";
// import ListJob from "@/components/ListJob";
// import ListUsers from "@/components/ListUsers";
// import CompanySearch from "@/components/CompanySearch";
// import JobSearch from "@/components/JobSearchBar";

// const applicationsData = [
//   { month: "Jan", count: 40 },
//   { month: "Feb", count: 55 },
//   { month: "Mar", count: 70 },
//   { month: "Apr", count: 90 },
// ];

// const jobsData = [
//   { name: "Design", value: 30 },
//   { name: "Tech", value: 30 },
//   { name: "Finance", value: 25 },
//   { name: "Other", value: 15 },
// ];

// const COLORS = ["#309689", "#00796B", "#80CBC4", "#B2DFDB"];

// const AdminDashboard = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const theme = useTheme();
//   const isMobileQuery = useMediaQuery(theme.breakpoints.down("sm"));

//   const [mounted, setMounted] = useState(false);
//   const [selected, setSelected] = useState("dashboard");
//   const [counts, setCounts] = useState({
//     applications: 0,
//     jobs: 0,
//     applicants: 0,
//     companies: 0,
//   });

//   useEffect(() => {
//     setMounted(true);
//     const tabFromUrl = searchParams?.get("tab") || "dashboard";
//     setSelected(tabFromUrl);
//   }, [searchParams]);

//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const res = await api.get("/dashboard/counts");
//         setCounts(res.data.data);
//       } catch (err) {
//         console.error("Failed to fetch counts", err);
//       }
//     };
//     fetchCounts();
//   }, []);

//   const handleTabChange = (key: string) => {
//     setSelected(key);
//     router.push(`/admin/dashboard?tab=${key}`);
//   };

//   const mobileTabs = [
//     { key: "dashboard", label: "Dashboard" },
//     { key: "applications", label: "Applications" },
//     { key: "companies", label: "Companies" },
//     { key: "jobs", label: "Jobs" },
//     { key: "users", label: "Users" },
//   ];

//   const renderContent = () => {
//     if (selected === "dashboard") {
//       return (
//         <>
//           <Stack direction={{ xs: "column", sm: "row" }} spacing={2} flexWrap="wrap" mb={3}>
//             {[
//               { title: "Applications", value: counts.applications },
//               { title: "Companies", value: counts.companies },
//               { title: "Jobs", value: counts.jobs },
//               { title: "Users", value: counts.applicants },
//             ].map((stat, idx) => (
//               <Box key={idx} flex={{ xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" }} minWidth={0}>
//                 <Card elevation={0} sx={{ borderRadius: 2, backgroundColor: "rgba(48,150,137,0.15)", color: "#fff" }}>
//                   <CardContent>
//                     <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>{stat.title}</Typography>
//                     <Typography variant="h5" fontWeight="bold">{stat.value}</Typography>
//                   </CardContent>
//                 </Card>
//               </Box>
//             ))}
//           </Stack>

//           {/* Charts */}
//           <Stack direction={{ xs: "column", md: "row" }} spacing={3} flexWrap="wrap">
//             {/* Line Chart */}
//             <Box sx={{ flex: 1, minWidth: 0, p: 2, borderRadius: 2, backgroundColor: "rgba(29, 117, 105, 0.25)" }}>
//               <Typography variant="h6" gutterBottom color="#fff">Applications Over Time</Typography>
//               <Box sx={{ width: "100%", height: 250 }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={applicationsData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//                     <XAxis dataKey="month" stroke="#ccc" />
//                     <YAxis stroke="#ccc" />
//                     <Tooltip />
//                     <Line type="monotone" dataKey="count" stroke="#309689" strokeWidth={2} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </Box>
//             </Box>

//             {/* Pie Chart */}
//             <Box sx={{ flex: 1, minWidth: 0, p: 2, borderRadius: 2, backgroundColor: "rgba(29, 117, 105, 0.25)" }}>
//               <Typography variant="h6" gutterBottom color="#fff">Jobs by Category</Typography>
//               <Box sx={{ width: "100%", height: 250 }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={jobsData}
//                       dataKey="value"
//                       nameKey="name"
//                       cx="50%"
//                       cy="50%"
//                       outerRadius={80}
//                       labelLine={false}
//                       label={({ cx, cy, midAngle = 0, innerRadius = 0, outerRadius = 0, index }) => {
//                         if (index === undefined) return null;
//                         const RADIAN = Math.PI / 180;
//                         const radius = innerRadius + (outerRadius - innerRadius) / 2;
//                         const x = cx + radius * Math.cos(-midAngle * RADIAN);
//                         const y = cy + radius * Math.sin(-midAngle * RADIAN);
//                         const item = jobsData[index];
//                         return item ? (
//                           <text
//                             x={x}
//                             y={y}
//                             fill="#fff"
//                             textAnchor="middle"
//                             dominantBaseline="central"
//                             fontSize={8}
//                           >
//                             {`${item.name} (${item.value})`}
//                           </text>
//                         ) : null;
//                       }}
//                     >
//                       {jobsData.map((entry, index) => (
//                         <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>

//                   </PieChart>
//                 </ResponsiveContainer>
//               </Box>
//             </Box>
//           </Stack>
//         </>
//       );
//     }

//     if (selected === "applications") return <ListApplications />
//     if (selected === "companies")
//       return (
//         <Box sx={{ width: "100%", mt: 3 }}>
//           <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" justifyContent="space-between" spacing={2} mb={2}>
//             <Box sx={{ flexGrow: 1, maxWidth: { xs: "100%", sm: "70%" } }}><CompanySearch /></Box>
//             <Button variant="contained" startIcon={<AddIcon />} sx={{ backgroundColor: "#309689", "&:hover": { backgroundColor: "#26786d" }, flexShrink: 0 }} component={Link} href="/company/add">Add Company</Button>
//           </Stack>
//           <ListCompanies />
//         </Box>
//       )
//     if (selected === "jobs")
//       return (
//         <Box sx={{ width: "100%", mt: 3 }}>
//           <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" justifyContent="space-between" spacing={2} mb={2}>
//             <Box sx={{ flexGrow: 1, maxWidth: { xs: "100%", sm: "70%" } }}><JobSearch /></Box>
//             <Button variant="contained" startIcon={<AddIcon />} sx={{ backgroundColor: "#309689", "&:hover": { backgroundColor: "#26786d" }, flexShrink: 0 }} component={Link} href="/job/add">Add Job</Button>
//           </Stack>
//           <ListJob />
//         </Box>
//       );
//     if (selected === "users") return <ListUsers />
//   };

//   if (!mounted) return null; // prevent hydration error

//   const isMobile = mounted && isMobileQuery;

//   return (
//     <Box sx={{ minHeight: "100vh" }}>
//       <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", pt: 8 }}>
//         {/* Sidebar */}
//         {!isMobile && (
//           <Box sx={{ width: { md: "240px" }, p: 2, borderRight: "1px solid rgba(255,255,255,0.1)" }}>
//             <Typography variant="h6" fontWeight="bold" mb={2} color="#fff">Admin Panel</Typography>
//             <List>
//               {[
//                 { key: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
//                 { key: "applications", label: "Applications", icon: <AssignmentIcon /> },
//                 { key: "companies", label: "Companies", icon: <BusinessIcon /> },
//                 { key: "jobs", label: "Jobs", icon: <WorkIcon /> },
//                 { key: "users", label: "Users", icon: <PeopleIcon /> },
//               ].map((item) => (
//                 <ListItemButton
//                   key={item.key}
//                   selected={selected === item.key}
//                   onClick={() => handleTabChange(item.key)}
//                   sx={{
//                     borderRadius: 1,
//                     mb: 1,
//                     color: "#ccc",
//                     "&.Mui-selected": { backgroundColor: "rgba(48,150,137,0.3)", color: "#fff" },
//                   }}
//                 >
//                   {item.icon}<ListItemText primary={item.label} sx={{ ml: 1 }} />
//                 </ListItemButton>
//               ))}
//             </List>
//           </Box>
//         )}

//         <Box sx={{ flexGrow: 1, p: 2, minHeight: "calc(100vh - 64px)" }}>
//           {isMobile && (
//             <Tabs value={selected} onChange={(e, value) => handleTabChange(value)} variant="scrollable" scrollButtons="auto" sx={{ mb: 2, bgcolor: "rgba(48,150,137,0.15)", borderRadius: 1 }}>
//               {mobileTabs.map(tab => <Tab key={tab.key} label={tab.label} value={tab.key} />)}
//             </Tabs>
//           )}
//           {renderContent()}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;



'use client';

import { useState, useEffect } from "react";
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

const COLORS = ["#309689", "#00796B", "#80CBC4", "#B2DFDB"];

const AdminDashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isMobileQuery = useMediaQuery(theme.breakpoints.down("sm"));

  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState("dashboard");

  const [counts, setCounts] = useState({
    applications: 0,
    jobs: 0,
    applicants: 0,
    companies: 0,
  });

  const [applicationsData, setApplicationsData] = useState<any[]>([]);
  const [jobsData, setJobsData] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    const tabFromUrl = searchParams?.get("tab") || "dashboard";
    setSelected(tabFromUrl);
  }, [searchParams]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // counts
        const countsRes = await api.get("/dashboard/counts");
        setCounts(countsRes.data.data);

        // applications over time
        const appsRes = await api.get("/dashboard/applications-over-time");
        setApplicationsData(appsRes.data.data);

        const res = await api.get("/dashboard/jobs-by-industry");
        setJobsData(res.data.data);
        } catch (err) {
          console.error("Failed to fetch jobs by industry", err);
        }
    };
    fetchDashboardData();
  }, []);

  const handleTabChange = (key: string) => {
    setSelected(key);
    router.push(`/admin/dashboard?tab=${key}`);
  };

  const mobileTabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "applications", label: "Applications" },
    { key: "companies", label: "Companies" },
    { key: "jobs", label: "Jobs" },
    { key: "users", label: "Users" },
  ];

  const renderContent = () => {
    if (selected === "dashboard") {
      return (
        <>
          {/* Counts */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            flexWrap="wrap"
            mb={3}
          >
            {[
              { title: "Applications", value: counts.applications },
              { title: "Companies", value: counts.companies },
              { title: "Jobs", value: counts.jobs },
              { title: "Users", value: counts.applicants },
            ].map((stat, idx) => (
              <Box
                key={idx}
                flex={{ xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" }}
                minWidth={0}
              >
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

          {/* Charts */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            flexWrap="wrap"
          >
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
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#309689"
                      strokeWidth={2}
                    />
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
                      label={({
                        cx,
                        cy,
                        midAngle = 0,
                        innerRadius = 0,
                        outerRadius = 0,
                        index,
                      }) => {
                        if (index === undefined) return null;
                        const RADIAN = Math.PI / 180;
                        const radius =
                          innerRadius + (outerRadius - innerRadius) / 2;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        const item = jobsData[index];
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
                        ) : null;
                      }}
                    >
                      {jobsData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </Stack>
        </>
      );
    }

    if (selected === "applications") return <ListApplications />;
    if (selected === "companies")
      return (
        <Box sx={{ width: "100%", mt: 3 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            mb={2}
          >
            <Box
              sx={{ flexGrow: 1, maxWidth: { xs: "100%", sm: "70%" } }}
            >
              <CompanySearch />
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: "#309689",
                "&:hover": { backgroundColor: "#26786d" },
                flexShrink: 0,
              }}
              component={Link}
              href="/company/add"
            >
              Add Company
            </Button>
          </Stack>
          <ListCompanies />
        </Box>
      );
    if (selected === "jobs")
      return (
        <Box sx={{ width: "100%", mt: 3 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            mb={2}
          >
            <Box
              sx={{ flexGrow: 1, maxWidth: { xs: "100%", sm: "70%" } }}
            >
              <JobSearch />
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: "#309689",
                "&:hover": { backgroundColor: "#26786d" },
                flexShrink: 0,
              }}
              component={Link}
              href="/job/add"
            >
              Add Job
            </Button>
          </Stack>
          <ListJob />
        </Box>
      );
    if (selected === "users") return <ListUsers />;
  };

  if (!mounted) return null; // prevent hydration error

  const isMobile = mounted && isMobileQuery;

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          pt: 8,
        }}
      >
        {/* Sidebar */}
        {!isMobile && (
          <Box
            sx={{
              width: { md: "240px" },
              p: 2,
              borderRight: "1px solid rgba(255,255,255,0.1)",
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
                  onClick={() => handleTabChange(item.key)}
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

        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            minHeight: "calc(100vh - 64px)",
          }}
        >
          {isMobile && (
            <Tabs
              value={selected}
              onChange={(e, value) => handleTabChange(value)}
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
  );
};

export default AdminDashboard;
