import express from "express"
import { upload } from "../middlewares/multer.middleware.js"
import {registerUser,loginUser, logoutUser, refreshAccessToken} from "../controllers/user.controller.js"
import checkAuth from "../middlewares/checkauth.middleware.js"
const userRouter  = express.Router()
userRouter.post("/register",upload.fields([
      {
            name:"avatar",
            maxCount:1
      }
]),registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/logout",checkAuth,logoutUser)
userRouter.post("/refresh-token",refreshAccessToken)
export default userRouter