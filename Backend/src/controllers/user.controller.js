import asyncHandler from "../utils/asyncHandler.js"
import  uploadOnClodinary from "../utils/cloudinary.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"
const registerUser  = asyncHandler(async(req,res)=>{
      const {name,email,bio,password} = req.body
      if(
            [name,email,bio,password].some((field)=>field.trim() == "")
      ){
            throw new apiError(400,"All fields are required")
      }
      const user = await User.findOne({email})
      if(user){
            throw new apiError(409,"User already exits")
      }
      const avatar = req.files?.avatar[0]?.path;
      if(!avatar){
            throw new apiError(400,"Avatar is required")
      }
      const response = await uploadOnClodinary(avatar)
      console.log(response.url)
      const new_user  = await User.create({
            name,
            email,
            bio,
            avatar:response?.url,
            password,
      })
      return res.status(201).json(
            new apiResponse(201,"User successfully register")
      )
})
const loginUser = asyncHandler(async(req,res)=>{
      const {email,password} = req.body
      if(!email || !password){
            throw new apiError(400,"Email and Password are required")
      }
      const user = await User.findOne({email})
      if(!user){
            throw new apiError(401,"User not found please register")
      }
      const isPasswordCorrect = await user.isPasswordCorrect(password)
      if(!isPasswordCorrect){
           throw new apiError(401,"Invalid Password")
      }
      const accessToken = await user.generateAccessToken()
      const refreshToken = await user.generateRefreshToken()
      if(!accessToken || !refreshToken){
            throw new apiError(400,"Something went wrong while generating a token")
      }

      user.refreshToken = refreshToken
      await user.save({validateBeforeSave:false})
      
      const options = {
            httpOnly:true,
            secure:true
      }
      const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
      return res.status(200)
      .cookie("accessToken",accessToken,options)
      .cookie("refreshToken",refreshToken,options).json(
            new apiResponse(200,"User successfully login",loggedInUser)
      )
})
const logoutUser = asyncHandler(async(req,res)=>{
     const userId = req.user._id
      // if(!userId){
      //       throw new apiError(401,"Bad request")
      // }
      await User.findByIdAndUpdate(
            userId,{
            $unset:{
                 refreshToken:1
            }
            },
           {new:true}
      )
      const options ={
            httpOnly:true,
            secure:true,
      }
      return res.status(200)
      .clearCookie("accessToken",options)
      .clearCookie("refreshToken",options)
      .json(
            new apiResponse(200,"User successfully logout")
      )
})
const refreshAccessToken = asyncHandler(async(req,res)=>{
      const user_refreshToken = req.headers.authorization || req.cookies.refreshToken
      if(!user_refreshToken){
            throw new apiError(401,"Bad request")
      }
      const decoded = await jwt.verify(user_refreshToken, process.env.REFRESH_SECRET_KEY)
      const userId = decoded._id
      const user = await User.findById(userId)
      if(!user){
            throw new apiError(401,"Invalid Refresh token")
      }
      if(user.refreshToken !== user_refreshToken){
            throw new apiError(401,"Invalid Refresh token")
      }
      const accessToken = await user.generateAccessToken()
      const refreshToken = await user.generateRefreshToken()
      user.refreshToken = refreshToken
      await user.save({validateBeforeSave:false})
      const options = {
            httpOnly:true,
            secure:true,
      }
      return res.status(201)
      .cookie("accessToken",accessToken,options)
      .cookie("refreshToken",refreshToken,options)
      .json(
           new apiResponse(201,"Token regenerated successfully")
      )

})
export {registerUser,loginUser,logoutUser,refreshAccessToken}