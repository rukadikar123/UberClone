import { Router } from "express";
import { body } from "express-validator";
import { registerCaptain, loginCaptain, getCaptainProfile } from "../Controllers/captain.controller.js";
import { authCaptain } from "../Middlewares/auth.middleware.js";

const router=Router()

router.post('/register',[
    body('email').isEmail().withMessage("Invalid email"),
    body('fullName.firstName').isLength({min:3}).withMessage("firstName must be atleast 3 char"),
    body('password').isLength({min:6}).withMessage("password must be 6 char long"),
    body('vehicle.color').isLength({min:3}).withMessage("color must be atleast 3 chars"),
    body('vehicle.plate').isLength({min:4}).withMessage("plate number must be atleast 4 chars"),
    body('vehicle.capacity').isInt({min:1}).withMessage("capacity must be atleast 1"),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle','auto']).withMessage("invalid type"),
] , registerCaptain)

router.post('/login', [
        body('email').isEmail().withMessage("Invalid email"),
        body('password').isLength({min:6}).withMessage("password must be 6 char long")
], loginCaptain)

router.get('/profile',authCaptain ,getCaptainProfile)

export default router   