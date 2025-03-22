"use client";
import React, { useEffect } from 'react';
import AddTransactionForm from './form';
import { useTransaction } from '@/hooks/useTransaction';
import { useParams } from 'next/navigation';

const EditTransaction = () => {
  const { id } = useParams();
  const { getTransactionById, transactionByid, error, loading, EditTransaction } = useTransaction();

  useEffect(() => {
    getTransactionById(id as string);
  }, [id]);

  return (
    <div>
      <AddTransactionForm
        transactionByid={transactionByid ?? null} 
        EditTransaction={EditTransaction}
        error={error}
        loading={loading}
      />
    </div>
  );
};

export default EditTransaction;
