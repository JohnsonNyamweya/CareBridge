import axios from "axios";
import AppointmentModel from "../models/AppointmentModel.js";
import getMpesaTimestamp from "../utils/formatTimeStamp.js";

// Initiate STK Push
const initiateStkPush = async (req, res) => {
  try {
    const { appointmentId, phone, mpesa_token } = req.body;
    const appointment = await AppointmentModel.findById(appointmentId);

    if (!appointment || appointment.cancelled) {
      return res.json({ success: false, message: "Invalid appointment" });
    }

    const timestamp = getMpesaTimestamp();
    // Generate password
    const password = new Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    const normalizedPhone = phone.startsWith("254") ? phone : `254${phone.substring(1)}`;

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: appointment.amount - appointment.amount + 1,
        PartyA: `254${phone.substring(1)}`,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: `254${phone.substring(1)}`,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: "CareBridge",
        TransactionDesc: "Appointment Fees",
      },
      {
        headers: {
          Authorization: `Bearer ${mpesa_token}`,
        },
      }
    );

    // Save checkout request ID
    appointment.checkoutRequestID = response.data.CheckoutRequestID;
    await appointment.save();

    res.json({
      success: true,
      message: "STK Push sent. Check your phone to complete payment.",
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "STK Push failed" });
  }
};

// Handle M-Pesa Callback
const mpesaCallback = async (req, res) => {
  try {
    const { Body } = req.body;

    if (Body.stkCallback.ResultCode === 0) {
      const checkoutRequestID = Body.stkCallback.CheckoutRequestID;

      await AppointmentModel.findOneAndUpdate(
        { checkoutRequestID },
        { payment: true }
      );
      res.json({ success: true, message: "Payment successful" });
    } else {
      res.json({ success: false, message: Body.stkCallback.ResultDesc });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
};

export { initiateStkPush, mpesaCallback };
