import { SignIn } from '@clerk/nextjs';
import React from 'react';
import Image from 'next/image';

const Page: React.FC = () => {
  return (
    <>
      <div
        className="fixed inset-0 z-[-1] bg-cover bg-center"
        style={{ backgroundImage: 'url(/v882batch2-kul-13-e.jpg)' }}
      />
      <div className="flex items-center justify-center min-h-screen">
        <SignIn />
      </div>
    </>
  );
};

export default Page;
