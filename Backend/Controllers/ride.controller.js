import { validationResult } from "express-validator";
import { createRide, getFare } from "../service/ride.service.js";

export const createARide=async(req, res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    const {userId, pickup, destination, vehicleType}=req.body
    try {
        const ride=await createRide({user:req.user._id, pickup, destination, vehicleType})

        return res.status(200).json({
            ride
        })
    } catch (error) {
            return res.status(400).json({
                message:error.message
            })
    }

}

export const GetFare=async(req, res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }

    const {pickup, destination}=req.query;
    
    try {
        const fare=await getFare(pickup, destination)
        return res.status(200).json({
            fare
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message
        })
    }
}