import { User } from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
const checkAuth = asyncHandler(async (req, res, next) => {
      try {
            const token = req.headers?.authorization?.split(" ")[1] || req.cookies?.accessToken
            if (!token) {
                  throw new apiError(401, "Unathorized request")
            }
            const decoded = await jwt.verify(token, process.env.ACCESS_SECRET_KEY)
            const userId = decoded._id
            const user = await User.findById(userId)
            if(!user){
                  throw new apiError(400,"User not found")
            }
            req.user = decoded
            next()
      } catch (error) {
            if (error.name === "TokenExpiredError") {
             throw new apiError(401, "Token has expired.");
            }
            else{
                  throw new apiError(401, error?.message)
            }
      }

})
export default checkAuth