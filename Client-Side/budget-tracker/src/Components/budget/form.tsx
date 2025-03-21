"use client"
import React, { useState } from 'react';
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

enum Category {
    FOOD = 'FOOD',
    TRANSPORT = 'TRANSPORT',
    HOUSING = 'HOUSING',
    UTILITIES = 'UTILITIES',
    ENTERTAINMENT = 'ENTERTAINMENT',
    SHOPPING = 'SHOPPING',
    HEALTHCARE = 'HEALTHCARE',
    PERSONAL = 'PERSONAL',
    EDUCATION = 'EDUCATION',
    OTHER = 'OTHER'
}

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
            await createBudget(budgetData);
        } else if (EditBudget) {
            EditBudget(budgetData, budgetById?._id as string)
        }


        if (!error) {
            setFormData({ category: '', amount: '' });
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, textAlign: 'center' }}>
                    <Typography variant="h5" component="h2" fontWeight="bold">
                        Create New Budget
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
                    <FormControl fullWidth margin="normal" variant="outlined" required>
                        <InputLabel>Category</InputLabel>
                        <Select
                            label="Category"
                            name="category"
                            value={formData.category}
                            defaultValue={budgetById?budgetById.category:''}
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
                        defaultValue={budgetById?budgetById.amount:''}
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
                        <Button color="inherit" type="button">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disableElevation
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Budget'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default BudgetForm;
