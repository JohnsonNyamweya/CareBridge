import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {

  const { backendUrl, userToken, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {headers: {userToken}});

      if (data?.success) {
        setAppointments(data?.appointments.reverse());
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, {headers: {userToken}});

      if (data?.success) {
        toast.success(data?.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  }

// Called when user clicks "Pay Online"
const payOnline = async (appointmentId, phone) => {
  try {
    const { data } = await axios.post(`${backendUrl}/api/payment/stkpush`, {
      appointmentId,
      phone,
    }, {headers: {userToken}});

    if (data.success) {
      toast.success("Enter your M-Pesa PIN on your phone to complete the payment.");
      getUserAppointments(); // refresh appointments
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Payment failed");
  }
};

  useEffect(() => {
    if (userToken) {
      getUserAppointments();
    }
  }, [userToken]);

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {
          appointments.map((appointment, index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-indigo-50' src={appointment.docData.image} alt="Doctor image" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{appointment.docData.name}</p>
                <p>{appointment.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{appointment.docData.address.line1}</p>
                <p className='text-xs'>{appointment.docData.address.line2}</p>
                <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time: </span>{slotDateFormat(appointment.slotDate)} | {appointment.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                { !appointment.cancelled && !appointment.payment && !appointment.isComplete && <button onClick={() => payOnline(appointment._id, appointment.userData.phone)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button> }
                { !appointment.cancelled && appointment.payment && !appointment.isComplete && <button className='text-sm text-green-500 text-center sm:min-w-48 py-2 border rounded'>Paid</button> }
                { !appointment.cancelled && !appointment.isComplete && !appointment.payment && <button onClick={() => cancelAppointment(appointment._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button> }
                { appointment.cancelled && !appointment.isComplete && !appointment.payment && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500 '>Appointment Cancelled</button> }
                { appointment.isComplete && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button> }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments