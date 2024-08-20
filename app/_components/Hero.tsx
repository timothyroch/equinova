'use client'

import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Hero = () => {

  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push('/sign-up'); 
  };
  const handleMore = () => {
    const element = document.getElementById('more');
    if (element) {
      const yOffset = -100; // Adjust this value for the amount of space you want
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <section className="">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Manage Your Expenses
        <strong className="font-extrabold text-primary sm:block"> Control Your Money </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        Start Creating your budget and save ton of money
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="/sign-up"
        >
          Get Started
        </a>

        <a
          className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-blue-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
          href="#"
          onClick={handleMore}
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>


    </div>
  )
}

export default Hero