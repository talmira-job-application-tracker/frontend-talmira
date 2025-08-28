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

'use client'

import { useState } from "react"
import Grid from "@mui/material/Grid"
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material"

import ListCompanies from "@/components/ListCompany"
import ListJob from "@/components/ListJob"
import ListUsers from "@/components/ListUsers"
import ListApplications from "@/components/ListApplications"
import Header from "@/components/Header"

const AdminDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [sideAction, setSideAction] = useState("list")

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
    setSideAction("list")
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

  const renderSideMenu = () => {
    let actions: string[] = []

    switch (tabIndex) {
      case 0: actions = ["List Applications", "Add Application", "Edit", "Delete"]; break
      case 1: actions = ["List Companies", "Add Company", "Edit", "Delete"]; break
      case 2: actions = ["List Jobs", "Add Job", "Edit", "Delete"]; break
      case 3: actions = ["List Users", "Add User", "Edit", "Delete"]; break
      default: actions = []
    }

    return (
      <List>
        {actions.map((action) => (
          <ListItem key={action} disablePadding>
            <ListItemButton
              selected={sideAction === action}
              onClick={() => setSideAction(action)}
            >
              <ListItemText primary={action} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Header/>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "center" }}>
        <Tabs value={tabIndex} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
          <Tab label="Applications" />
          <Tab label="Companies" />
          <Tab label="Jobs" />
          <Tab label="Users" />
        </Tabs>
      </Box>

      {/* Layout with Grid */}
      <Grid container spacing={2} sx={{ mt: 2, p: 2 }}>
        
          {renderSideMenu()}
        
        
          {renderMainContent()}
        
      </Grid>
    </Box>
  )
}

export default AdminDashboard

