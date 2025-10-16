import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/carebridge`)
        console.log('Mongodb connected successfully')
    } catch (error) {
        console.log(error)
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;