"use client";
import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import {
  IncomeCategory,
  ExpenseCategory,
  Transaction,
  Transactions,
} from "../../hooks/useTransaction";
import axiosErrorManager from "@/utils/axiosErrorManager";
import {
  TransactionFormValues,
  transactionValidationSchema,
} from "@/Schema/schema";
import { useRouter } from "next/navigation";

interface AddTransactionFormProps {
  addTransaction?: (transactionDt: Transaction) => Promise<string | void>;
  error: string | null;
  loading: boolean;
  EditTransaction?: (transactionDt: Transaction, id: string) => Promise<string | void>;
  transactionByid?: Transactions | null; // <-- allowing null
}

// Initial State
const initialState: TransactionFormValues = {
  amount: null,
  type: "expense",
  category: "",
  date: "",
  description: "",
};

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({
  addTransaction,
  error,
  loading,
  EditTransaction,
  transactionByid,
}) => {
  const route = useRouter();

  // Dynamic Initial Values
  const getInitialValues = (): TransactionFormValues => {
    if (transactionByid) {
      return {
        amount: transactionByid.amount,
        type: transactionByid.type,
        category: transactionByid.category,
        date: transactionByid.date.slice(0, 10), 
        description: transactionByid.description || "",
      };
    }
    return initialState;
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, resetForm } =
    useFormik({
      initialValues: getInitialValues(),
      enableReinitialize: true, // Important
      validationSchema: transactionValidationSchema,
      onSubmit: async () => {
        const transactionData: Transaction = {
          amount: Number(values.amount),
          type: values.type as "income" | "expense",
          category: values.category,
          date: values.date,
          description: values.description,
        };
        if (addTransaction) {
          try {
            await addTransaction(transactionData);
            route.push("/transaction");
          } catch (error) {
            axiosErrorManager(error);
          }
        } else if (EditTransaction && transactionByid) {
          try {
            await EditTransaction(transactionData, transactionByid._id);
            route.push("/transaction");
          } catch (error) {
            axiosErrorManager(error);
          }
        }
        resetForm();
      },
    });

  const getCategories = () => {
    if (values.type === "income") {
      return Object.values(IncomeCategory);
    } else if (values.type === "expense") {
      return Object.values(ExpenseCategory);
    } else {
      return [];
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {transactionByid ? "Edit Transaction" : "Add Transaction"}
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          {/* Transaction Type */}
          <FormControl component="fieldset" margin="normal" fullWidth>
            <FormLabel component="legend">Transaction Type</FormLabel>
            <RadioGroup
              row
              name="type"
              value={values.type}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <FormControlLabel value="expense" control={<Radio />} label="Expense" />
              <FormControlLabel value="income" control={<Radio />} label="Income" />
            </RadioGroup>
            {touched.type && errors.type && (
              <Typography color="error" variant="caption">
                {errors.type}
              </Typography>
            )}
          </FormControl>

          {/* Amount */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Amount"
            name="amount"
            value={values.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
            inputProps={{
              step: "0.01",
              min: "0",
            }}
            error={touched.amount && Boolean(errors.amount)}
            helperText={touched.amount && errors.amount}
          />

          {/* Category */}
          <TextField
            select
            margin="normal"
            required
            fullWidth
            id="category"
            label="Category"
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!values.type}
            error={touched.category && Boolean(errors.category)}
            helperText={touched.category && errors.category}
          >
            <MenuItem value="" disabled>
              Select a category
            </MenuItem>
            {getCategories().map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>

          {/* Date */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="date"
            label="Date"
            name="date"
            type="date"
            value={values.date}
            onChange={handleChange}
            onBlur={handleBlur}
            InputLabelProps={{
              shrink: true,
            }}
            error={touched.date && Boolean(errors.date)}
            helperText={touched.date && errors.date}
          />

          {/* Description */}
          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Description (Optional)"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Add a note about this transaction"
          />

          {/* Buttons */}
          <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={() => resetForm()}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Transaction
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddTransactionForm;
