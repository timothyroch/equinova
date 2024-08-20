'use client'

import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from '@clerk/nextjs' 
import CardInfo from './_components/CardInfo';
import { Budgets, Expenses } from '@/utils/schema';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { db } from '@/utils/dbConfig';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

const page = () => {
  const {user} = useUser();

  const [budgetList, setBudgetList] = useState<any[]>([]);
  const [expensesList,setExpensesList] = useState();


  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    if (!user) return;

    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
    getAllExpenses();
  }

const getAllExpenses=async()=>{
  const result=await db.select({
    id:Expenses.id,
    name:Expenses.name,
    amount:Expenses.amount,
    createdAt:Expenses.createdAt
  }).from(Budgets)
  .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
  .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
  .orderBy(desc(Expenses.id));
  setExpensesList(result);
}

  return (
    <div className='p-8'>
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName}</h2>
      <p className='text-gray-500'>Here's what's happenning with your money, Let's manage your expenses</p>

      <CardInfo budgetList={budgetList} />
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className=' md:col-span-2'>
           <BarChartDashboard
           budgetList={budgetList}
           />
           
          <ExpenseListTable
          expensesList={expensesList}
          refreshData={()=>getBudgetList()}
          />

        </div>
        <div className='grid gap-5'>
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
          {budgetList?budgetList.map((budget,index)=>(
            <BudgetItem budget={budget} key={index} />
          )): (
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            )))
          }
        </div>
      </div>
    </div>
  )
}

export default page