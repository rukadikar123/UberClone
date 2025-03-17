import { validationResult } from "express-validator"
import {getAddressCoordinators} from "../service/maps.service.js"

export const getCoordinates=async (req, res)=>{
    const errors=validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    
    const {address}=req.query

    try {
        const coordinates =await getAddressCoordinators(address)
        res.status(200).json({
            success:true,
            coordinates
        })
    } catch (error) {
           res.status(404).json({
            message:"Coordinates not found"
           }) 
    }

}    