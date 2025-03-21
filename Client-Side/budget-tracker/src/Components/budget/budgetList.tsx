"use client"
import React, { useEffect } from 'react';
import { 
  Box, 
  Button,
  Card, 
  CardContent,
  CircularProgress,
  Container, 
  Grid,
  IconButton, 
  LinearProgress,
  Paper, 
  Typography,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useBudget, Budget, Category } from '@/hooks/useBudget';  // import Category enum

// Category colors mapped strictly to Category enum
const categoryColors: Record<Category, string> = {
  [Category.FOOD]: '#FF5722',
  [Category.TRANSPORT]: '#2196F3',
  [Category.HOUSING]: '#4CAF50',
  [Category.UTILITIES]: '#9C27B0',
  [Category.ENTERTAINMENT]: '#FFC107',
  [Category.SHOPPING]: '#E91E63',
  [Category.HEALTHCARE]: '#00BCD4',
  [Category.PERSONAL]: '#FF9800',
  [Category.EDUCATION]: '#3F51B5',
  [Category.OTHER]: '#607D8B'
};

// Mock spent data, typed safely
const mockSpent: Partial<Record<Category, number>> = {
  [Category.FOOD]: 320,
  [Category.TRANSPORT]: 270,
  [Category.HOUSING]: 1200,
  [Category.UTILITIES]: 150,
  [Category.SHOPPING]: 250
};

const BudgetList = () => {
  const theme = useTheme();
  const { getallBudget, budget: budgets, loading, error } = useBudget();

  useEffect(() => {
    getallBudget();
  }, []);

  const formatCategoryName = (category: Category): string => {
    return category
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  const calculateProgress = (category: Category, amount: number): number => {
    const spent = mockSpent[category] || 0;
    return Math.min((spent / amount) * 100, 100);
  };

  const handleAddBudget = () => {
    console.log('Navigate to add budget form');
    // Navigate to add budget form
  };

  const handleEditBudget = (id: string) => {
    console.log('Edit budget with ID:', id);
    // Navigate to edit budget form
  };

  const handleDeleteBudget = (id: string) => {
    if (window.confirm("Are you sure you want to delete this budget?")) {
      console.log('Delete budget with ID:', id);
      // Call delete API here
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" fontWeight="bold">
            My Budgets
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            startIcon={<AddIcon />}
            onClick={handleAddBudget}
            sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
          >
            Add Budget
          </Button>
        </Box>

        <Box sx={{ p: 3 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : !budgets || budgets.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
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
              {budgets.map((budget: Budget) => {
                const category = budget.category as Category; 
                const progress = calculateProgress(category, budget.amount);
                const categoryColor = categoryColors[category] || theme.palette.primary.main;
                
                return (
                  <Grid item xs={12} sm={6} md={4} key={budget._id}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        borderTop: `4px solid ${categoryColor}`,
                        position: 'relative',
                        '&:hover .budget-actions': {
                          opacity: 1
                        }
                      }}
                    >
                      <Box className="budget-actions" sx={{ 
                        position: 'absolute', 
                        top: 5, 
                        right: 5, 
                        opacity: 0, 
                        transition: 'opacity 0.2s',
                        display: 'flex',
                        bgcolor: 'rgba(255,255,255,0.9)',
                        borderRadius: 1
                      }}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleEditBudget(budget._id)}
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => handleDeleteBudget(budget._id)}
                          sx={{ color: theme.palette.error.main }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          {formatCategoryName(category)}
                        </Typography>
                        
                        <Typography variant="h4" fontWeight="bold" color="text.primary">
                          ${budget.amount.toLocaleString()}
                        </Typography>
                        
                        <Box sx={{ mt: 2, mb: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={progress}
                            sx={{ 
                              height: 8, 
                              borderRadius: 4,
                              backgroundColor: theme.palette.grey[200],
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: progress >= 100 ? theme.palette.error.main : categoryColor
                              }
                            }}
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Spent: ${mockSpent[category] || 0}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color={progress >= 100 ? "error.main" : "text.secondary"}
                            fontWeight={progress >= 100 ? "bold" : "normal"}
                          >
                            {progress.toFixed(0)}%
                          </Typography>
                        </Box>
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
