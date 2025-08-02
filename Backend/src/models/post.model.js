import { Schema,model } from "mongoose";
const postSchema  = new Schema({
      author:{
            type:Schema.Types.ObjectId,
            ref:"User"
      },
      content:{
            type:String,
            required:true,
            trim:true,
      }
},{timestamps:true})
export const Post = model("Post",postSchema)