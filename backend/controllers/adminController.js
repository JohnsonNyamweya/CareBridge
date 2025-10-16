import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import DoctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import AppointmentModel from '../models/AppointmentModel.js'
import UserModel from '../models/userModel.js'

//API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body;
        const imageFile = req.file;

        //checking for all data to add doctor
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.json({success: false, message: "Add the missing details"})
        }

        //Validating email format
        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email."})
        }

        if(password.length < 8) {
            return res.json({success: false, message: "Your password must be at least 8 characters long."})
        }

        //Hashing doctor password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Uploading the image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
        const imageUrl = imageUpload.secure_url;

        // 6. Store doctor in MongoDB
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        };

        const newDoctor = new DoctorModel(doctorData);
        await newDoctor.save();

        res.json({success: true, message: "Doctor added successfully."})
    } catch (error) {
        console.log("Doctor not added:", error)
        res.json({success: false, message: error.message})
    }
}

//API  for admin login
const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, message: 'Logged in successfully', token})
        } else {
            res.json({success: false, message: "Invalid credentials."})
        }
    } catch (error) {
        console.log("Doctor not added:", error)
        res.json({success: false, message: error.message})
    }
}

//API to get all doctors for the admin panel
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await DoctorModel.find({}).sort({date: -1}).select('-password');
        res.json({success: true, message: "Doctors fetched successfully", doctors})
    } catch (error) {
        console.log("Error in fetching doctors:", error)
        res.json({success: false, message: error.message})
    }
}

//API to get all appointments list
const appointmentsAdmin = async (req,res) => {
    try {
        const appointments = await AppointmentModel.find({});
        res.json({success: true, message: "Appointments fetched successfully", appointments})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

//API for appointment cancellation by admin
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await AppointmentModel.findById(appointmentId);

    await AppointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    //free the slot in doctor's slots_booked
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await DoctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (slot) => slot !== slotTime
    );
    await DoctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API  to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {
        const doctors = await DoctorModel.find({});
        const users = await UserModel.find({});
        const appointments = await AppointmentModel.find({});

        const dashboardData = {
            doctors: doctors.length,
            patients: users.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({success: true, dashboardData})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addDoctor, loginAdmin, getAllDoctors, appointmentsAdmin, appointmentCancel, adminDashboard };