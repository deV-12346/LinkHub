import express from "express"
import cookieparser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.router.js"
const app = express()

app.use(express.json())
app.use(cookieparser())
app.use(express.static("Public"))
app.use(cors({
      origin:"http://localhost:5173",
//      origin:"https://link-hub-wine-pi.vercel.app",
     credentials:true
}))
app.get("/",(req,res)=>{
      res.send("Hello from routes")
})
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)
export default app