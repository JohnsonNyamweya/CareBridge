import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashboardData, setDashboardData] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const fetchAllDoctors = async () => {
        try {
            const {data} = await axios.post(`${backendUrl}/api/admin/all-doctors`, {}, {headers: {adminToken}});
            if(data?.success) {
                setDoctors(data?.doctors);
                console.log(data.doctors)
            } else {
                toast.error (data?.message);
            } 
        } catch (error) {
            toast.error (error?.message);
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const {data} = await axios.post(`${backendUrl}/api/admin/change-availability`, {docId}, {headers: {adminToken}});
            if(data?.success) {
                fetchAllDoctors();
                toast.success (data?.message);
            } else {
                toast.error (data?.message);
            }
        } catch (error) {
            toast.error (error?.message);
        }
    }

    const getAllAppointments = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/admin/appointments`, {headers: {adminToken}});
            if(data?.success) {
                setAppointments(data?.appointments);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            toast.error(error?.message);
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, {appointmentId}, {headers: {adminToken}});
            if(data?.success) {
                getAllAppointments();
                toast.success(data?.message);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            toast.error(error?.message);
        }
    }

    const getDashboardData = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/admin/dashboard`, {headers: {adminToken}});
            if(data?.success) {
                setDashboardData(data?.dashboardData);
                console.log(data?.dashboardData);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            toast.error(error?.message);
        }
    }

    const value = {
        adminToken, setAdminToken, backendUrl, doctors, fetchAllDoctors,
        changeAvailability, appointments, setAppointments, getAllAppointments,
         cancelAppointment, getDashboardData, dashboardData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export {AdminContext, AdminContextProvider}