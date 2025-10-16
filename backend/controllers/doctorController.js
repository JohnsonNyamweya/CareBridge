import DoctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AppointmentModel from "../models/AppointmentModel.js";

//API to change doctor availability
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await DoctorModel.findById(docId);
    if (docData) {
      await DoctorModel.findByIdAndUpdate(
        docId,
        {
          available: !docData.available,
        },
        { new: true }
      );

      res.json({
      success: true,
      message: "Doctor availability changed.",
    });
    } else {
      return res.json({ success: false, message: "Doctor not found." });
    }

    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await DoctorModel.find({}).select(['-password', '-email']);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//API  for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await DoctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const doctorToken = jwt.sign({id: doctor._id}, process.env.JWT_SECRET);
    res.json({ success: true, message: 'Logged in successfully', doctorToken });
      
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//API  to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.user;
    const appointments = await AppointmentModel.find({docId});

    res.json({success: true, appointments});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//API to mark appointment complete for the doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const docId = req.user;
    const {appointmentId} = req.body;

    const appointmentData = await AppointmentModel.findById(appointmentId);

    if(appointmentData && appointmentData.docId === docId) {
      await AppointmentModel.findByIdAndUpdate(appointmentId, {isComplete: true});

      res.json({success: true, message: "Appointment completed"})
    } else {
      res.json({success: false, message: "Failed to mark appointment as completed"})
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//API to cancel appointment for the doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const docId = req.user;
    const {appointmentId} = req.body;

    const appointmentData = await AppointmentModel.findById(appointmentId);

    if(appointmentData && appointmentData.docId === docId) {
      await AppointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true});

      res.json({success: true, message: "Appointment cancelled"})
    } else {
      res.json({success: false, message: "Failed to cancel appointment"})
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//API  to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.user
    const appointments = await AppointmentModel.find({docId})

    let earnings = 0

    appointments.map((appointment) => {
      if(appointment.isComplete || appointment.payment) {
        earnings += appointment.amount
      }
    })

    let patients = []

    appointments.map((appointment) => {
      if(!patients.includes(appointment.userId)) {
        patients.push(appointment.userId)
      }
    })

    const dashboardData = {
      earnings,
      patients: patients.length,
      appointments: appointments.length,
      latestAppointments: appointments.reverse().slice(0, 5)
    }

    res.json({success: true, dashboardData})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//API  to get doctor profile for doctor panel
const doctorProfile = async (req, res) => {
  try {
    const docId = req.user
    const profileData = await DoctorModel.findById(docId).select('-password')

    res.json({success: true, profileData})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//API  to update doctor profile for doctor panel
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.user
    const {fees, address, available} = req.body
    
    await DoctorModel.findByIdAndUpdate(docId, {fees, address, available}, {new: true})

    res.json({success: true, message: 'Profile updated'})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


export { 
  changeAvailability, doctorList, loginDoctor, appointmentsDoctor,
  appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile,
  updateDoctorProfile 
};
