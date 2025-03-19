import { validationResult } from "express-validator"
import {getAddressCoordinators, getDistanceAndTime, getAutoCompleteSuggestionsfunc} from "../service/maps.service.js"

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

export const getDistanceTime=async(req, res)=>{
 try {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }

    const {origin, destination}=req.query; 

    const distanceTime=await getDistanceAndTime(origin, destination);

    res.status(200).json(
        distanceTime
    )
 } catch (error) {
    console.log(error);
    res.status(400).json({
        message:'No route found'
    })
 }   
}

export const getAutoCompleteSuggestions=async (req, res)=>{
    try {
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors:errors.array()
                })
            }

            const {input}=req.query
            const suggestions=await getAutoCompleteSuggestionsfunc(input)
            return res.status(200).json({
                suggestions
            })

    } catch (error) {
        return res.status(400).json({
            message:'Unable to fetch autocomplete suggestions'
        })
    }
}