"use client";
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { ArrowUpward, ArrowDownward, Add } from "@mui/icons-material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTransaction } from "@/hooks/useTransaction";
import { useEffect, useMemo } from "react";
import { ExpenseCategory, IncomeCategory } from "@/hooks/useTransaction"; // Adjust path if needed
import { useRouter } from "next/navigation";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#d32f2f", "#7b1fa2", "#1976d2", "#388e3c",
  "#f57c00", "#e91e63", "#9e9e9e", "#455a64"
];

const Dashboard = () => {
  const { transaction, getAllTransaction } = useTransaction();
const router=useRouter()
  useEffect(() => {
    getAllTransaction();
  }, []);

  const totalIncome = transaction?.filter((tran) => tran.type === "income").reduce((acc, crr) => acc + crr.amount, 0) || 0;
  const totalExpense = transaction?.filter((tran) => tran.type === "expense").reduce((acc, crr) => acc + crr.amount, 0) || 0;

  const expenseData = useMemo(() => {
    const categoryMap: { [key: string]: number } = {};
    Object.values(ExpenseCategory).forEach((cat) => categoryMap[cat] = 0);
    transaction?.forEach((tran) => {
      if (tran.type === "expense") {
        categoryMap[tran.category] += tran.amount;
      }
    });
    return Object.keys(categoryMap).map((key) => ({ name: key, value: categoryMap[key] }));
  }, [transaction]);

  const incomeData = useMemo(() => {
    const categoryMap: { [key: string]: number } = {};
    Object.values(IncomeCategory).forEach((cat) => categoryMap[cat] = 0);
    transaction?.forEach((tran) => {
      if (tran.type === "income") {
        categoryMap[tran.category] += tran.amount;
      }
    });
    return Object.keys(categoryMap).map((key) => ({ name: key, value: categoryMap[key] }));
  }, [transaction]);

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
              <Typography variant="h6">{totalExpense}</Typography>
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
              <Typography variant="h6">{totalIncome}</Typography>
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
              <Typography variant="h6">{totalIncome - totalExpense}</Typography>
              <Typography color="success.main" variant="body2">
                <ArrowUpward fontSize="small" /> 8% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pie Chart Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" mb={2}>Expense by Category</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {expenseData.map((_, index) => (
                      <Cell key={`cell-expense-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" mb={2}>Income by Category</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={incomeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {incomeData.map((_, index) => (
                      <Cell key={`cell-income-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Transaction Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        sx={{
          borderRadius: '30px',
          px: 2,
          position: 'fixed',
          bottom: 20,
          right: 20,
          height: 50
        }}
        onClick={()=>router.push("/transaction/add")}
      >
        Add Transaction
      </Button>

    </Box>
  );
};

export default Dashboard;
