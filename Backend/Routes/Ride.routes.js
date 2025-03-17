import { Router } from "express";
import { body } from "express-validator";
import { createARide } from "../Controllers/ride.controller.js";
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

export default router;
