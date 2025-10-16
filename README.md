CareBridge is a full-stack Doctor Appointment and Booking Application built with the MERN Stack (MongoDB, Express, React, Node.js).
It provides a seamless experience for patients to find doctors based on specialty, book or cancel appointments, and make secure payments via M-Pesa or cash.
The platform includes three distinct roles — Admin, Doctor, and Patient — each with unique features and dashboards.

Features
Patient

Register, login, and manage personal profile.
Browse doctors by specialty and availability.
Book appointments with preferred doctors.
Cancel or continue appointments with secure M-Pesa or cash payment options.
View appointment history and upcoming bookings.
Protected routes using JWT Authentication.

Doctor

Login securely using JWT-based authentication.
View personalized dashboard showing:
Total earnings
Number of appointments
Number of patients
Latest appointments
Access all appointments with patient details.
Update personal profile and availability.

Admin

Secure login and management dashboard.
Add, edit, or remove doctors.
View statistics such as:

Total doctors
Total patients
Total appointments
Latest appointments
View all registered doctors.
Oversee system data and ensure smooth operation.

Authentication

Implemented JWT (JSON Web Token) authentication for all roles (Admin, Doctor, Patient).
Tokens are securely stored and validated for protected routes and sensitive operations.

Payment Integration

Integrated M-Pesa payment system for online transactions.
Patients can choose between M-Pesa and cash payment methods.
Real-time payment status updates reflected in the patient and doctor dashboards.

Tech Stack

Frontend
React.js
Axios for API communication
Tailwind CSS for styling

Backend
Node.js
Express.js
MongoDB with Mongoose ODM

JWT for Authentication

M-Pesa Daraja API for Payments
