import mongoose from "mongoose";
const connectDb = async () =>{
      try {
            const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/Link-hub`)
            console.log("MongoDb Connected !! Hosted on ",connectionInstance.connection.host)
      } catch (error) {
            console.log("MongoDB connection failed ",error.message)
            process.exit(1)     
      }
}
export default connectDb