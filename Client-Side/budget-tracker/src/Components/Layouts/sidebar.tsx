"use client"
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useRouter } from "next/navigation";
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from "js-cookie";
const Sidebar = () => {
  const router = useRouter()
  const handleLogout = () => {
    Cookies.remove("refreshToken")
    Cookies.remove("accessToken")
    router.push("/")
  }
  return (
    <Box width="240px" bgcolor="#f5f7fa" height="100vh" p={2}>
      <Typography variant="h6" fontWeight="bold" mb={4} color="primary">
        Expense Tracker
      </Typography>

      <List>
        <ListItem component="button" selected onClick={() => router.push("/home")}>
          <ListItemIcon><DashboardIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component="button" onClick={() => router.push("/transaction")}>
          <ListItemIcon><ListAltIcon /></ListItemIcon>
          <ListItemText primary="Transactions" />
        </ListItem>
        <ListItem component="button" onClick={() => router.push("/budget")}>
          <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
          <ListItemText primary="Budgets" />
        </ListItem>
        <ListItem component="button" onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logot" />
        </ListItem>

      </List>
    </Box>
  );
};

export default Sidebar;
