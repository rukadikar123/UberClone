import { User } from "../Models/user.schema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const isLoggedIn=async (req, res, next)=>{
    const token =req.cookies.token || req.headers.authorization.split(" ")[1]

    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    } 

    try {
        const decoded=jwt.verify(token, process.env.JWT_SECRET)
        const user=await User.findById(decoded._id)
        req.user=user;

        return next()

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }

}