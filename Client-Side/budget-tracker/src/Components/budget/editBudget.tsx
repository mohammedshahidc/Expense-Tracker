"use client"
import React, { useEffect } from 'react'
import BudgetForm from './form'
import { useBudget } from '@/hooks/useBudget'
import { useParams } from 'next/navigation'

const EditBudget = () => {
    const { id } = useParams<{ id: string }>();
        const {getBudgetById,budgetById,error,loading,EditBudget}=useBudget()
    useEffect(()=>{
        getBudgetById(id)
    },[])

  return (
    <div>
      <BudgetForm error={error} loading={loading} EditBudget={EditBudget} budgetById={budgetById} />
    </div>
  )
}

export default EditBudget
