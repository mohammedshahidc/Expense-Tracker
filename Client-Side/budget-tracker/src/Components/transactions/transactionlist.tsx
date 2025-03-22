"use client"
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Chip, TablePagination,
  Tooltip, Button
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import { useTransaction } from '@/hooks/useTransaction';
import { Transactions } from '../../hooks/useTransaction'; 
import { useRouter } from 'next/navigation';
import axiosErrorManager from '@/utils/axiosErrorManager';

const TransactionList: React.FC = () => {
  const { getAllTransaction, transaction,deleteTransaction } = useTransaction();
const router=useRouter()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getAllTransaction();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };
const handleDelete=async(id:string)=>{
try {
    await deleteTransaction(id)
    await getAllTransaction()
} catch (error) {
    axiosErrorManager(error)
}
}
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
        boxSizing: 'border-box',
      }}
    >
      {/* Heading */}
      <Typography variant="h4" fontWeight="bold" mb={3}>Transactions History</Typography>

      {/* Table Section with Button on top right */}
      <Box sx={{ width: '90%', position: 'relative' }}>
        {/* Add Button */}
        <Box sx={{ position: 'absolute', top: -55, right: 0 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() =>router.push("/transaction/add") }
          >
            Add Transaction
          </Button>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            maxHeight: '60vh',
            overflow: 'auto',
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transaction && transaction.length > 0 ? (
                transaction
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((trans: Transactions) => (
                    <TableRow key={trans._id} hover>
                      <TableCell>{new Date(trans.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Chip 
                          label={trans.type.charAt(0).toUpperCase() + trans.type.slice(1)} 
                          color={trans.type === 'income' ? 'success' : 'error'} 
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{trans.category}</TableCell>
                      <TableCell sx={{ color: trans.type === 'income' ? 'success.main' : 'error.main' }}>
                        {trans.type === 'income' ? '+' : '-'} {formatCurrency(trans.amount)}
                      </TableCell>
                      <TableCell>{trans.description || '-'}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit">
                          <IconButton size="small" color="primary" onClick={()=>router.push(`/transaction/${trans._id}`)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" color="error" onClick={()=>handleDelete(trans._id)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">No transactions found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box display="flex" justifyContent="center" mt={2}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            count={transaction ? transaction.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TransactionList;
