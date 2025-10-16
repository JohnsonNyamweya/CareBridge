import React, {useState} from 'react'
import { AppContext } from './AppContext.jsx'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const AppContextProvider = (props) => {
    const currencySymbol = 'Kshs'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([]);
    const [userToken, setUserToken] = useState(localStorage.getItem("userToken") ? localStorage.getItem("userToken") : false);
    const [userData, setUserData] = useState(false);

    const getDoctorsData = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/doctor/list`); 
            if(data?.success) {
                setDoctors(data?.doctors);
                toast.success(data?.message);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error); 
            toast.error (error?.message);
        }
    }

    const loadUserProfileData = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: {
                    userToken
                }
            });
            if(data?.success) {
                setUserData(data?.userData);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error); 
            toast.error (error?.message);
        }
    }

    useEffect(() => {
        getDoctorsData();
    }, [])

    useEffect(() => {
        if(userToken) {
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    }, [userToken])


    const value = {
        doctors, currencySymbol, backendUrl, userToken, setUserToken,
        userData, getDoctorsData, setUserData, loadUserProfileData
    }

    return (
        <AppContext.Provider value={value}>
            { props.children }
        </AppContext.Provider>
    )
}

export default AppContextProvider;