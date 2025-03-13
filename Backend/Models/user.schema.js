import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema=new mongoose.Schema ({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:[3,"first name must be atleast 3 chars"]
        },
        lastName:{
            type:String,
            minlength:[3,"last name must be atleast 3 chars"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:[5,"email must be atleast 5 chars"]
    },
    password:{
        type:String,
        required:true,
        select:false
    },

    socketId:{
        type:String
    }

},{timestamps:true})

userSchema.pre("save", async function (next){
    if (!this.isModified("password")) return next()

    this.password=await bcrypt.hash(this.password, 10)
    next()    
})

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this.id}, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      })
    return token
}

userSchema.methods.comparePassword=async function (password) {
    return await bcrypt.compare(password, this.password)
}



export const User= mongoose.model('User', userSchema)