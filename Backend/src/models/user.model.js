import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
      name: {
            type: String,
            required: true,
            trim: true,
      },
      email: {
            type: String,
            required: true,
            unique:true,
      },
      bio: {
            type: String,
            required: true,
            trim: true,
      },
      avatar: {
            type: String,               //cloudinary
            required: true,
      },
      refreshToken: {
            type: String,
      },
      password: {
            type: String,
            required: true,
      },
      posts:[{
            type:Schema.Types.ObjectId,
            ref:"Post"
      }]
}, { timestamps: true })
userSchema.pre("save",async  function (next) {
      if (!this.isModified("password")) return next()
      this.password = await bcrypt.hash(this.password, 10)
      next()

})
userSchema.methods.isPasswordCorrect = async function (password) {
      return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function () {
      return jwt.sign({
            _id: this._id,
            name: this.name,
            email: this.email
      },
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: process.env.ACCESS_EXPIRES_IN }
      )
}
userSchema.methods.generateRefreshToken = function () {
      return jwt.sign({
            _id: this._id,
            name: this.name,
      },
            process.env.REFRESH_SECRET_KEY,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
      )
}
export const User = model("User", userSchema)