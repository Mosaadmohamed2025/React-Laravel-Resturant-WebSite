import React from 'react'
import title from '../assets/images/title-img.png';

const OrderTracking = () => {
  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto" src={title} />
      <h2 class="mt-2  w-full dark:text-[#ff9800] text-center text-4xl font-bold leading-9 tracking-tight ">Order Tracking</h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="number" class="block text-sm font-medium leading-6 dark:text-[#777]  text-gray-900">Phone</label>
          <div class="mt-2">
            <input type='number' id='number' required class=" dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="number" class="block text-sm font-medium leading-6 dark:text-[#777]  text-gray-900">Order Number</label>
          <div class="mt-2">
            <input type='number' id='number' required class=" dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
  
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-[#df2020] dark:bg-[#680813] ">Submit</button>
        </div>
      </form>
  
      </div>
  </div>
  );
}

export default OrderTracking