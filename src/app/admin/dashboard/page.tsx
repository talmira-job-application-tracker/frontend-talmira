// 'use client'
// import ListApplications from "@/components/ListApplications"
// import ListCompanies from "@/components/ListCompany"
// import ListJob from "@/components/ListJob"
// import ListUsers from "@/components/ListUsers"
// import { Box, Tab, Tabs } from "@mui/material"
// import { useState } from "react"

// const adminDashboard = () => {
//   const [tabIndex, setTabIndex] = useState(0)

//   return (
//     <div>
//       <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
//         <Tab label="Applications" />
//         <Tab label="Jobs" />
//         <Tab label="Companies" />
//         <Tab label="Users" />
//       </Tabs>

//       <Box sx={{ mt: 2 }}>
//         {tabIndex === 0 && <ListApplications />}
//         {tabIndex === 1 && <ListJob />}
//         {tabIndex === 2 && <ListCompanies />}
//         {tabIndex === 3 && <ListUsers />}
//       </Box>
//     </div>
//   )
// }

// export default adminDashboard

// 'use client'

// import { useState } from "react"
// import { Box, Tab, Tabs, Grid, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
// import ListApplications from "@/components/ListApplications"
// import ListCompanies from "@/components/ListCompany"
// import ListJob from "@/components/ListJob"
// import ListUsers from "@/components/ListUsers"
// import Header from "@/components/Header"

// const AdminDashboard = () => {
//   const [tabIndex, setTabIndex] = useState(0)
//   const [sideAction, setSideAction] = useState("list")

//   const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
//     setTabIndex(newValue)
//     setSideAction("list") // reset sidebar on tab change
//   }

//   const renderMainContent = () => {
//     switch (tabIndex) {
//       case 0: return <ListApplications />
//       case 1: return <ListCompanies />
//       case 2: return <ListJob />
//       case 3: return <ListUsers />
//       default: return null
//     }
//   }

//   const renderSideMenu = () => {
//     let actions: string[] = []

//     switch (tabIndex) {
//       case 0: actions = ["List Applications", "Add Application", "Edit Application", "Delete Application"]; break
//       case 1: actions = ["List Companies", "Add Company", "Edit Company", "Delete Company"]; break
//       case 2: actions = ["List Jobs", "Add Job", "Edit Job", "Delete Job"]; break
//       case 3: actions = ["List Users", "Add User", "Edit User", "Delete User"]; break
//       default: actions = []
//     }

//     return (
      
//       <List sx={{ borderRight: "1px solid #ddd" }}>
//         {actions.map((action) => (
//           <ListItem key={action} disablePadding>
//             <ListItemButton
//               selected={sideAction === action}
//               onClick={() => setSideAction(action)}
//             >
//               <ListItemText primary={action} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     )
//   }

//   return (
//     <Box sx={{ mt: "64px" }}>
//       {/* Header */}
//       <Header />

//       {/* Tabs */}
//       <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "center" }}>
//         <Tabs value={tabIndex} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
//           <Tab label="Applications" />
//           <Tab label="Companies" />
//           <Tab label="Jobs" />
//           <Tab label="Users" />
//         </Tabs>
//       </Box>

//       {/* Layout with Grid: Sidebar + Content */}
//       <Grid container spacing={2} sx={{ mt: 2, p: 2 }}>
//         {/* <Grid item xs={3}> */}
//           {renderSideMenu()}
//         {/* </Grid> */}
//         {/* <Grid item xs={9}> */}
//           {renderMainContent()}
//         {/* </Grid> */}
//       </Grid>
//     </Box>
//   )
// }

// export default AdminDashboard

'use client'

import { useState } from "react"
import { Box, Tab, Tabs } from "@mui/material"
import ListApplications from "@/components/ListApplications"
import ListCompanies from "@/components/ListCompany"
import ListJob from "@/components/ListJob"
import ListUsers from "@/components/ListUsers"
import Header from "@/components/Header"
import CompanySearch from "@/components/CompanySearch"

const AdminDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  const renderMainContent = () => {
    switch (tabIndex) {
      case 0: return <ListApplications />
      case 1: return <ListCompanies />
      case 2: return <ListJob />
      case 3: return <ListUsers />
      default: return null
    }
  }

  return (
    <Box sx={{ mt: "64px" }}>
      {/* ✅ Global Header */}
      <Header />

      <CompanySearch/>

      {/* ✅ Tabs */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Applications" />
          <Tab label="Companies" />
          <Tab label="Jobs" />
          <Tab label="Users" />
        </Tabs>
      </Box>

      {/* ✅ Main Content */}
      <Box sx={{ mt: 2, p: 2 }}>
        {renderMainContent()}
      </Box>
    </Box>
  )
}

export default AdminDashboard

