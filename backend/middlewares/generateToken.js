import axios from "axios";
// Generate M-Pesa Access Token
const generateToken = async (req, res, next) => {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const auth = new Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      "base64"
    );

    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      { headers: { Authorization: `Basic ${auth}` } }
    );

    const mpesa_token = response.data.access_token;

    if (!mpesa_token) {
      console.log("Failed to generate M-Pesa access token");
      res.json({ success: false, message: "Payment failed" });
    }

    req.body = { ...req.body, mpesa_token };

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default generateToken;
