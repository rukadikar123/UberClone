import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const captainSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
        minlength: [3, "first name must be atleast 3 chars"],
      },
      lastName: {
        type: String,
        required: true,
        minlength: [3, "last name must be atleast 3 chars"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [5, "email must be atleast 5 chars"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:['active', 'inactive'],
        default:'inactive'
    },
    vehical:{
        color:{
            type:String,
            required:true,
            minlength:[3, "color must be atleast 3 chars"]
        },
        plate:{
            type:String,
            required:true,
            minlength:[4, "plate number must be atleast 4 chars"]
        },
        capacity:{
            type:Number,
            required:true,
            min:[1, "capacity must be atleast 1 "]
        },
        vehicalType:{
            type:String,
            required:true,
            enum:['car', 'motorcycle','auto']
        },
        location:{
            lat:{
                type:Number
            },
            lng:{
                type:Number
            }
        }
    }
  },
  { timestamps: true }
);

captainSchema.pre("save", async function (next){
    if (!this.isModified("password")) return next()

    this.password=await bcrypt.hash(this.password, 10)
    next()    
})

captainSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this.id}, process.env.JWT_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
          })
        return token
}

captainSchema.methods.comparePassword=async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const Captain=mongoose.model("Captan", captainSchema)