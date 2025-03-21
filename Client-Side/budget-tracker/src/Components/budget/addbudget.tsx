"use client"
import React from 'react'
import BudgetForm from './form'
import { useBudget } from '@/hooks/useBudget'

const Addbudget = () => {
    const {loading,error,createBudget}=useBudget()
  return (
    <div>
      <BudgetForm loading={loading} error={error} createBudget={createBudget} />
    </div>
  )
}

export default Addbudget
