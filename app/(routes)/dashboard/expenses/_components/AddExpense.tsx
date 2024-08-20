'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import React, { useState } from 'react'
import { toast } from 'sonner';
import moment from 'moment';
import { Loader } from 'lucide-react';


const AddExpense = ({ budgetId, user, refreshData }) => {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false)
  const addNewExpense = async () => {
    setLoading(true)
    const result = await db.insert(Expenses).values({
      name: name,
      amount: amount,
      budgetId: budgetId,
      createdAt: moment().format('DD/MM/yyy')
    }).returning({ insertedId: Budgets.id });

    setAmount('');
    setName('');

    console.log(result);
    if (result) {
      setLoading(false)
      refreshData()
      toast('New Expense Added!')
    }
    setLoading(false)
  }
  return (
    <div className='border p-5 rounded-lg'>
      <h2 className='font-bold text-lg'>Add Expenses</h2>
      <div className='mt-2'>
        <h2 className='text-black font-medium my-1'>Expense Name</h2>
        <Input placeholder='e.g. Bedroom Decor'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='mt-2'>
        <h2 className='text-black font-medium my-1'>Expense Amount</h2>
        <Input placeholder='e.g. 1000'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button disabled={!(name && amount)||loading}
        onClick={() => addNewExpense()}
        className='mt-3 w-full'>
        {loading ?
          <Loader className='animate-spin' /> : "Add New Expense"
        }

      </Button>
    </div>
  )
}

export default AddExpense