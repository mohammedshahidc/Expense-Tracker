"use client";
import React, { useEffect, useMemo } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useTransaction } from "../../hooks/useTransaction";
import { Budget, Category, useBudget } from "../../hooks/useBudget";
import { useRouter } from "next/navigation";
import axiosErrorManager from "@/utils/axiosErrorManager";

const categoryColors: Partial<Record<Category, string>> = {
  [Category.Food]: "#FFB74D",
  [Category.Travel]: "#4FC3F7",
  [Category.Housing]: "#81C784",
  [Category.Entertainment]: "#FFD54F",
  [Category.Shopping]: "#F48FB1",
  [Category.Health]: "#4DD0E1",
  [Category.PERSONAL]: "#FFCC80",
  [Category.EDUCATION]: "#7986CB",
  [Category.Others]: "#90A4AE",
  [Category.Bills]: "#AED581",
  [Category.Salary]: "#BA68C8",
  [Category.Investment]: "#A1887F",
};

const BudgetList: React.FC = () => {
  const { transaction, getAllTransaction } = useTransaction();
  const { budget, getallBudget, loading, deleteBudget } = useBudget();
  const router = useRouter();

  const spentByCategory = useMemo(() => {
    const result: Partial<Record<Category, number>> = {};

    if (transaction) {
      transaction.forEach((t) => {
        if (t.type === "expense") {
          result[t.category as Category] =
            (result[t.category as Category] || 0) + t.amount;
        }
      });
    }
    return result;
  }, [transaction]);

  useEffect(() => {
    getallBudget();
    getAllTransaction();
  }, []);

  const handleAddBudget = () => {
    router.push("/budget/add");
  };

  const handleEdit = (id: string) => {
    router.push(`/budget/${id}`);
  };

  const handleDelete =async (id: string) => {
   try {
   await deleteBudget(id)
   await getallBudget()
   } catch (error) {
    axiosErrorManager(error)
   }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        {/* HEADER */}
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            My Budgets
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={handleAddBudget}
            sx={{
              bgcolor: "white",
              color: "primary.main",
              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
            }}
          >
            Add Budget
          </Button>
        </Box>

        <Box sx={{ p: 3 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : !budget || budget.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                No budgets found
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                Create your first budget to start tracking your expenses
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddBudget}
              >
                Create Budget
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {budget.map((budget) => {
                const isValidCategory = Object.values(Category).includes(
                  budget.category as Category
                );
                const categoryKey = isValidCategory
                  ? (budget.category as Category)
                  : Category.Others;

                const spent = spentByCategory[categoryKey] || 0;
                const progress = (spent / budget.amount) * 100;
                const color = categoryColors[categoryKey] || "#BDBDBD";

                return (
                  <Grid item xs={12} sm={6} md={4} key={budget._id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderTop: `4px solid ${color}`,
                        position: "relative",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        borderRadius: "16px",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                          "& .budget-actions": {
                            opacity: 1,
                          },
                        },
                      }}
                    >
                      {/* Edit/Delete buttons */}
                      <Box
                        className="budget-actions"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          display: "flex",
                          gap: 1,
                          bgcolor: "rgba(255,255,255,0.9)",
                          borderRadius: 1,
                          opacity: 0,
                          transition: "opacity 0.3s",
                          zIndex: 1,
                          p: 0.5,
                        }}
                      >
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(budget._id)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(budget._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{ color: "#3f51b5" }}
                          gutterBottom
                        >
                          {budget.category}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          gutterBottom
                        >
                          Budget: ₹{budget.amount.toLocaleString()} | Spent: ₹
                          {spent.toLocaleString()}
                        </Typography>

                        <Box sx={{ mt: 2, mb: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={progress > 100 ? 100 : progress}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: "#F0F0F0",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor:
                                  progress >= 100 ? "#e53935" : color,
                              },
                            }}
                          />
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mt: 1,
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Spent: ₹{spent.toLocaleString()}
                          </Typography>
                          <Typography
                            variant="body2"
                            color={
                              progress >= 100 ? "error.main" : "text.secondary"
                            }
                            fontWeight={progress >= 100 ? "bold" : "normal"}
                          >
                            {progress.toFixed(0)}%
                          </Typography>
                        </Box>

                        {progress > 100 && (
                          <Typography
                            variant="caption"
                            color="error"
                            sx={{ mt: 1, display: "block", fontWeight: 500 }}
                          >
                            Overspent!
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default BudgetList;
