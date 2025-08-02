import { User } from "../models/user.model";
import apiError from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken"
const checkAuth = asyncHandler(async (req, res, next) => {
      try {
            const token = req.headers?.authorization?.split(" ")[1] || req.cookies?.accessToken
            if (!token) {
                  throw new apiError(401, "Unathorized request")
            }
            const decoded = await jwt.verify(token, process.env.ACCESS_SECRET_KEY)
            const userId = decoded._id
            const user = User.findById(userId)
            if(!user){
                  throw new apiError(400,"User not found")
            }
            req.user = decoded
            next()
      } catch (error) {
            throw new apiError(400, error?.message)
      }

})
export default checkAuth