"use client"
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { ArrowUpward, ArrowDownward, Add } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', amt: 300 },
  { name: 'Feb', amt: 500 },
  { name: 'Mar', amt: 200 },
  { name: 'Apr', amt: 700 },
  { name: 'May', amt: 400 },
];

const Dashboard = () => {
  return (
    <Box p={3} flex={1} bgcolor="#f9fafb">
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Dashboard
      </Typography>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Total Expenses</Typography>
              <Typography variant="h6">$1,248.33</Typography>
              <Typography color="error" variant="body2">
                <ArrowDownward fontSize="small" /> 12% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Total Income</Typography>
              <Typography variant="h6">$3,500.00</Typography>
              <Typography color="success.main" variant="body2">
                <ArrowUpward fontSize="small" /> 5% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Balance</Typography>
              <Typography variant="h6">$2,251.67</Typography>
              <Typography color="success.main" variant="body2">
                <ArrowUpward fontSize="small" /> 8% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Monthly Spending Chart */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" mb={2}>Monthly Spending</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amt" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Add Transaction Button */}
      <Button variant="contained" color="primary" startIcon={<Add />} sx={{ borderRadius: '50%', width: 60, height: 60, position: 'fixed', bottom: 20, right: 20 }}>
      </Button>
    </Box>
  );
};

export default Dashboard;
