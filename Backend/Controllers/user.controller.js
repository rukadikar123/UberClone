import { User } from "../Models/user.schema.js";
import { createUser } from "../service/user.service.js";
import {validationResult} from 'express-validator'

const registerUser=async (req, res, next)=>{
    const errors=validationResult(req)

    if (!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }

    const {fullName, email, password}=req.body;
    
    const existingUser= await User.findOne({email})

    if(existingUser){
        throw new Error("Email is already registered")
    }

    const user=await createUser({
        firstName:fullName.firstName,
        lastName:fullName.lastName,
        email,
        password
    })

    user.password=undefined

    const token=user.generateAuthToken()

    res.status(200).json({
        success:true,token, user
    })

}

export {registerUser }