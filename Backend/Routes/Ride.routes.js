import {  Router } from "express";
import { body, query } from "express-validator";
import { createARide, GetFare } from "../Controllers/ride.controller.js";
import { isLoggedIn } from "../Middlewares/auth.middleware.js";

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
    // query('pickup').isString().isLength({min:3}).withMessage('invalid pickup'),
    // query('destination').isString().isLength({min:3}).withMessage('invalid pickup'),
  GetFare)

export default router;
