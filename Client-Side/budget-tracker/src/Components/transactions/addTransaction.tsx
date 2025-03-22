"use client"
import React from 'react'
import AddTransactionForm from './form'
import { useTransaction } from '@/hooks/useTransaction'

const AddTransaction = () => {
    const { addTransaction, error, loading } = useTransaction()
    return (
        <div>
            <AddTransactionForm addTransaction={addTransaction} error={error} loading={loading} />
        </div>
    )
}

export default AddTransaction
