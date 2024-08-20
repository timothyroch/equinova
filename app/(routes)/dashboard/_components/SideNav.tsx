'use client'

import { UserButton } from '@clerk/nextjs'
import { Layout, LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutGrid,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Budgets',
      icon: PiggyBank,
      path: '/dashboard/budgets'
    },
    {
      id: 3,
      name: 'Expenses',
      icon: ReceiptText,
      path: '/dashboard/expenses'
    },
    /*{
      id: 4,
      name: 'Upgrade',
      icon: ShieldCheck,
      path: '/dashboard/upgrade'
    }*/
  ]
  const path = usePathname();

  return (
    <div className='h-screen p-5 border shadow-sm'>
      <div className='inline-flex items-center space-x-2'>
        <Image
          src='/logo.svg'
          alt='logo'
          width={60}
          height={60}
        />
        <h2 className='font-bold text-2xl sm:text-3xl text-primary'>EquiNova</h2>
      </div>
      <div className='mt-5'>
        {menuList.map((menu) => (
          <Link href={menu.path}>
          <h2 key={menu.id} className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 ${path===menu.path&&'text-primary bg-blue-100'}`}>
            <menu.icon/>
            {menu.name}
          </h2>
          </Link>
        ))}
      </div>
      <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
        <UserButton/> Profile
      </div>
    </div>
  )
}

export default SideNav
