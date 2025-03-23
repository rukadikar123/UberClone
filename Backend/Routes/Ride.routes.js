import {  Router } from "express";
import { body, query } from "express-validator";
import {  confirmRide, createARide, endRide, GetFare, startRide } from "../Controllers/ride.controller.js";
import { authCaptain, isLoggedIn } from "../Middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/create", isLoggedIn,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid destination"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "motorcycle"])
    .withMessage("invalid vehicle type"),
  createARide
);


router.get('/get-fare', isLoggedIn,
    query('pickup').isString().isLength({min:3}).withMessage('invalid pickup'),
    query('destination').isString().isLength({min:3}).withMessage('invalid pickup'),
  GetFare)


router.post('/confirm',authCaptain, body('rideId').isMongoId().withMessage('invalid ride id'),confirmRide)  

router.get('/start-ride', authCaptain, query('rideId').isMongoId().withMessage('invalid ride id'), query('otp').isString().isLength({min:6, max:6}).withMessage('invalid otp'), startRide)

router.post('/end-ride', authCaptain, 
  body('rideId').isMongoId().withMessage('invalid ride id'),
  endRide
)


export default router;
