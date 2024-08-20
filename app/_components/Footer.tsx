import React from 'react'
import Image from 'next/image';


const Footer = () => {
  return (


<footer className='border shadow-md mt-[150px]'>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="sm:flex sm:items-center sm:justify-between">
    <div className='inline-flex items-center space-x-2'>
  <Image 
    src={'./logo.svg'}
    alt='logo'
    width={80}
    height={80}
    
  />
<h2 className='font-bold text-4xl text-primary'>EquiNova</h2>
</div>

      <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
        Copyright &copy; 2024. All rights reserved.
      </p>
    </div>
  </div>
</footer>

  )
}

export default Footer