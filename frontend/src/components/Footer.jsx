import React from 'react'
import { assets } from '../assets/assets_frontend/assets.js'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* Left section */}
            <div>
                <div className='flex gap-2 items-center mb-5'>
                    <img className='w-12 h-10 rounded-md border border-1 border-blue-700' src={assets.logo} alt="Application Logo" />
                    <p className='text-2xl font-medium text-blue-700'>CareBridge</p>
                </div>
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>We bridge the gap between patients and trusted doctors, ensuring healthcare is just a click away—anytime, anywhere. </p>
            </div>
        
            {/* Center section */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
             {/* Right section */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+254711223344</li>
                    <li>carebridge@gmail.com</li>
                </ul>
            </div>
        </div>
        {/* Copyright Text */}
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ CareBridge - All Rights Reserved.</p>
    </div>
  )
}

export default Footer