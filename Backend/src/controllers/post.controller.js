import asyncHandler from "../utils/asyncHandler.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import { User } from "../models/user.model.js"
import {Post} from "../models/post.model.js"
const userPost = asyncHandler(async(req,res)=>{
      const {post} = req.body
      const userId = req.user._id
      console.log(userId)
      const user = await User.findById(userId)
      if(!user){
            throw new apiError(401,"User not found")
      }
      const createdPost = await Post.create({
            author:userId,
            content:post
     })
      user.posts.push(createdPost._id)
      await user.save()
     return res.status(200).json(
      new apiResponse(200,"Content Posted",{})
     )
})
const fecthAllPosts = asyncHandler(async(req,res)=>{
      const posts = await Post.find().populate("author","_id name avatar").sort({createdAt:-1})
      return res.status(200).json(
            new apiResponse(200,"Posts fetched",posts)
      )
})
const fectchUserPosts = asyncHandler(async(req,res)=>{
      const userId = req.user._id
      const posts = await Post.find({author:userId}).populate("author","name email avatar")
      .select("-password -refreshToken")
      return res.status(200).json(
            new apiResponse(200,"User Posts fetched",posts)
      )
})
const selectedUser = asyncHandler(async(req,res)=>{
      const {id} = req.query
      const user = await User.findById(id).populate("posts","content")
      if(!user){
            throw new apiError(401,"User not found")
      }
      return res.status(200).json(
            new apiResponse(200,"Selected user profile fecthed",user)
      )
})
export {userPost,fecthAllPosts,fectchUserPosts,selectedUser}