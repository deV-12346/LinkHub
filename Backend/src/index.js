import dotenv from "dotenv"
import connectDb from "./db/index.js"
import app from "./app.js"
dotenv.config()
connectDb()
.then(()=>{
      app.listen(process.env.PORT || 5000,()=>{
            console.log(`Server started on ${process.env.PORT}`)
      })   
})
.catch((err)=>{
      console.log("Something went wrong",err.message)
})