import { validationResult } from "express-validator";
import { createRide, getFare, confirmARide, startARide, endARide } from "../service/ride.service.js";
import {
  getAddressCoordinators,
  getCaptainsInTheRadius,
} from "../service/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import { Ride } from "../Models/ride.model.js";

export const createARide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { userId, pickup, destination, vehicleType } = req.body;
  try {
    const ride = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    const pickupCoordinates = await getAddressCoordinators(pickup);
    const captainsInRadius = await getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2
    );

    ride.otp = "";
    const rideWithUser=await Ride.findOne({_id:ride._id}).populate('user')
    captainsInRadius.map( (captain) => {
        sendMessageToSocketId(captain.socketId, {
            event:'new-ride',
            data:rideWithUser
        })
    });
    return res.status(200).json({
      ride,
      captainsInRadius,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const GetFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await getFare(pickup, destination);
    return res.status(200).json({
      fare,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const confirmRide=async (req, res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const {rideId}=req.body
  try {
      const ride =await confirmARide({rideId, captain:req.captain})
    sendMessageToSocketId(ride.user.socketId,{
      event:'ride-confirm',
      data:ride
    })


      return res.status(200).json({ride})
  } catch (error) {
      return res.status(400).json({message:error.message})
  }
}

export const startRide=async(req, res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const {rideId, otp}=req.query

  try {
    const ride =await startARide({rideId, otp, captain:req.captain})

    sendMessageToSocketId(ride.user.socketId, {
      event:'ride-started',
      data:ride
    })
    
  } catch (error) {
      return res.status(400).json({message:error.message})
  }
}


export const endRide=async (req, res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }


  const {rideId}=req.body

  try {
    const ride=await endARide({rideId, captain:req.captain._id})

    sendMessageToSocketId(ride.user.socketId, {
      event:'ride-ended',
      data: ride
    })

    
  } catch (error) {
    return res.status(400).json({message:error.message})
  }
}