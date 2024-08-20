'use client'

import React, { useEffect, useState } from 'react'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from '../budgets/_components/BudgetItem'


// Define a type for the budget item
interface BudgetItemType {
  id: string
  name: string
  totalSpend: number
  totalItem: number
}

const ExpensesPage = () => {
  const [budgetList, setBudgetList] = useState<BudgetItemType[]>([])
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      getBudgetList()
    }
  }, [user?.primaryEmailAddress?.emailAddress])

  const getBudgetList = async () => {
    if (!user) return

    try {
      const result = await db.select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      }).from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id))

      setBudgetList(result)
    } catch (error) {
      console.error('Error fetching budget list:', error)
    }
  }

  return (
    <div className='p-5 gap-5'>
      <h2 className='font-bold text-3xl p-8'>Choose Category of Expense</h2>
      {budgetList.length > 0 ? (
        budgetList.map((budget) => (
          <BudgetItem key={budget.id} budget={budget} />
        ))
      ) : (
        Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
          />
        ))
      )}
    </div>
  )
}

export default ExpensesPage
