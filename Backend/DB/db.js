import mongoose from "mongoose";

async function connectToDB(){
    try {
       const instance= await mongoose.connect(process.env.MONGODB_URI)
       console.log(`MangoDB connected !! DB Host: ${instance.connection.host}`);
       
    } catch (error) {
        console.log("Mongodb connection Error:",error);
        process.exit(1)
    }
}

export default connectToDB