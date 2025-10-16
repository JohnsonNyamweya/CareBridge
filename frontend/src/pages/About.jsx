import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="About image" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>CareBridge makes it easy to book doctor appointments online, helping patients connect with trusted healthcare providers in just a few clicks.</p>
          <p>Doctors can manage their schedules efficiently, while patients enjoy the flexibility to book, reschedule, or cancel anytime.</p>
          <p>With a simple, secure, and reliable platform, CareBridge bridges the gap between patients and doctors—bringing healthcare closer to you.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>At CareBridge, our vision is to make healthcare more accessible and convenient for everyone. We strive to bridge the gap between patients and doctors by providing a seamless, digital-first appointment experience that saves time, reduces stress, and empowers people to take control of their health.</p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 md:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>CareBridge streamlines the appointment process, eliminating long waits and reducing missed bookings. Doctors and patients save valuable time with a system designed for smooth scheduling.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 md:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>Book, reschedule, or cancel appointments anytime, anywhere. CareBridge brings healthcare access to your fingertips with a simple, user-friendly interface.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 md:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p>Our platform tailors the experience to each patient, allowing you to choose trusted doctors, view availability, and manage your healthcare journey with confidence.</p>
        </div>
      </div>
    </div>
  )
}

export default About