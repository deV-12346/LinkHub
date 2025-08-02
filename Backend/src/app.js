import express from "express"
import cookieparser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
const app = express()

app.use(express.json())
app.use(cookieparser())
app.use(express.static("Public"))
app.use(cors({
     origin:process.env.ORIGIN,
     credential:true
}));
app.get("/",(req,res)=>{
      res.send("Hello from routes")
})
app.use("/api/user",userRouter)
export default app