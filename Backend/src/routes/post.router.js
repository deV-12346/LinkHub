import express from "express"
import checkAuth from "../middlewares/checkauth.middleware.js"
import { userPost,fecthAllPosts,fectchUserPosts } from "../controllers/post.controller.js"
const postRouter = express.Router()
postRouter.post("/post",checkAuth,userPost)
postRouter.get("/allposts",fecthAllPosts)
postRouter.get("/user-posts",checkAuth,fectchUserPosts)
export default postRouter