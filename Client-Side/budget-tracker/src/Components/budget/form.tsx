"use client"
import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material';
import { Budget } from '@/hooks/useBudget';
import { useRouter } from 'next/navigation';
import axiosErrorManager from '@/utils/axiosErrorManager';
import { Category } from '@/hooks/useBudget';

interface BudgetFormProps {
    createBudget?: (budgetData: { category: string; amount: number }) => Promise<string | void>;
    EditBudget?: (budgetData: { category: string; amount: number }, id: string) => Promise<string | void>;
    error: string | null;
    loading: boolean;
    budgetById?: Budget | null;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ createBudget, EditBudget, budgetById, error, loading }) => {
    const [formData, setFormData] = useState({
        category: '',
        amount: '',
    });
    const router = useRouter()

    useEffect(() => {
        if (budgetById) {
            setFormData({
                category: budgetById.category,
                amount: String(budgetById.amount),
            });
        }
    }, [budgetById]);
    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name!]: value
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const budgetData = {
            category: formData.category,
            amount: Number(formData.amount)
        };
        if (createBudget) {
            try {
                await createBudget(budgetData);
                router.push('/budget')
            } catch (error) {
                axiosErrorManager(error)
            }

        } else if (EditBudget) {
            try {
                EditBudget(budgetData, budgetById?._id as string)
                router.push('/budget')
            } catch (error) {
                axiosErrorManager(error)
            }
        }


        if (!error) {
            setFormData({ category: '', amount: '' });
        }
    };
    console.log('bud:', budgetById);
    return (
        <Container 
        maxWidth="md"
        sx={{ 
            mt: 8, 
            mb: 8, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '80vh' 
        }}
    >
        <Paper 
            elevation={4} 
            sx={{ 
                borderRadius: 3, 
                overflow: 'hidden', 
                width: { xs: '100%', sm: '85%', md: '70%' }, // Increased width
                maxWidth: '800px', // Limit max width
                p: 4 
            }}
        >
            {/* HEADER */}
            <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 1.5, px: 2, textAlign: 'center' }}>
                <Typography variant="h5" component="h2" fontWeight="bold">
                    {budgetById ? 'Edit Budget' : 'Create New Budget'}
                </Typography>
            </Box>
    
            {/* FORM */}
            <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
                <FormControl fullWidth margin="normal" variant="outlined" required>
                    <InputLabel>Category</InputLabel>
                    <Select
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleSelectChange}
                    >
                        {Object.values(Category).map((category) => (
                            <MenuItem key={category} value={category}>
                                {category.charAt(0) + category.slice(1).toLowerCase().replace('_', ' ')}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
    
                <TextField
                    fullWidth
                    label="Budget Amount"
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleInputChange}
                    margin="normal"
                    required
                    InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                    variant="outlined"
                />
    
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
    
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button color="inherit" type="button" onClick={() => router.push("/budget")}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disableElevation
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : budgetById ? "Edit Budget" : 'Create Budget'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    </Container>
    
    );
};

export default BudgetForm;
