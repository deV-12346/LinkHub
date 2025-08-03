import dotenv from "dotenv"
import connectDb from "./db/index.js"
import app from "./app.js"
dotenv.config()
connectDb()
.then(()=>{
      console.log(`Db connected`)
})
.catch((err)=>{
      console.log("Something went wrong",err.message)
})