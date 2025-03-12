import { validationResult } from "express-validator";
import { Captain } from "../Models/captain.schema.js";
import { createCaptain } from "../service/captain.service.js";

const registerCaptain = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { fullName, email, password, vehicle } = req.body;

  const isExist = await Captain.findOne({email});

  if (isExist) {
    return res.status(400).json({message:"Email is already registered"})
  }

  const captain =await createCaptain({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password,
    color:vehicle.color,
    plate:vehicle.plate,
    capacity:vehicle.capacity,
    vehicleType:vehicle.vehicleType,

  });
  captain.password = undefined;

  const token=captain.generateAuthToken();

  res.status(200).json({
    success: true,
    token,
    captain,
  })


};

export { registerCaptain };
