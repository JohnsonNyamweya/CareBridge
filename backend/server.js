import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import paymentRouter from "./routes/paymentRoutes.js";

//app config
const app = express();

const PORT = process.env.PORT || 3000;
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
app.use('/api/payment', paymentRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

//Start the express app
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server listening for connections on port: ${PORT}`)
  );
});
