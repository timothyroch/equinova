'use client';

import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Header: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/sign-in');
  };

  const handleGetStartedClick = () => {
    router.push('/sign-up');
  };

  const handleDashboardClick = () => {
    router.push('/dashboard');
  };

  const { isSignedIn } = useUser();

  return (
    <div className='p-5 flex justify-between items-center border shadow-md'>
      <div className='inline-flex items-center space-x-2'>
        <Image
          src='/logo.svg'
          alt='logo'
          width={60}
          height={60}
        />
        <h2 className='font-bold text-2xl sm:text-3xl text-primary'>EquiNova</h2>
      </div>

      <div className='inline-flex items-center space-x-4'>
        {isSignedIn ? (
          <>
            <Button onClick={handleDashboardClick}>
              Dashboard
            </Button>
            <UserButton />
          </>
        ) : (
          <>
            <Button onClick={handleGetStartedClick}>
              Get Started
            </Button>
            <Button onClick={handleLoginClick}>
              Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
