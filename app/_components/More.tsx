'use client'

import { useRouter } from 'next/navigation';
import React from 'react'

const More = () => {

const router = useRouter();

  const handleGetStartedClick = () => {
    router.push('/sign-up'); 
  };

  return (
    <div id='more' className='mt-[50px]'>


<section className="overflow-hidden mb-30 sm:grid sm:grid-cols-2 my-[100px] mb-[200px]">
  <div className="p-8 md:p-12 lg:px-16 lg:py-24">
    <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
      Learn More About Our Finance Tracker App
      </h2>

      <p className=" text-gray-500 md:mt-4 ">
      Our Finance Tracker App is designed to help you take control of your finances with ease and precision. With a user-friendly interface, you can create and manage budgets to fit your unique needs. Track your expenses effortlessly and gain insights into your spending patterns through dynamic charts and visualizations. Whether you’re looking to optimize your savings or simply stay organized, our app offers the tools you need to make informed financial decisions and achieve your financial goals.
      </p>

      <div className="mt-4 md:mt-8">
        <a
          href="/sign-up"
          className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring focus:ring-yellow-400"
        >
          Get Started Today
        </a>
      </div>
    </div>
  </div>

  <img
    alt=""
    src={`/wealth.avif`}
    className="h-56 w-full object-cover sm:h-full"
  />
</section>
    </div>
  )
}

export default More