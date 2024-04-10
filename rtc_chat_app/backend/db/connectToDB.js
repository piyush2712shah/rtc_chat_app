import mongoose from "mongoose";

const connectToDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI,);
        console.log("connected to DB")
    } catch (error) {
        console.log("error in connecting to DB",error.message)
    }
}

export default connectToDB;
