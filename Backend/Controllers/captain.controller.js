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

  const isExist = await Captain.findOne({ email });

  if (isExist) {
    return res.status(400).json({ message: "Email is already registered" });
  }

  const captain = await createCaptain({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });
  captain.password = undefined;

  const token = captain.generateAuthToken();

  res.status(200).json({
    success: true,
    token,
    captain,
  });
};

const loginCaptain = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  const captain = await Captain.findOne({email}).select("+password");

  if (!captain) {
    return res.status(400).json({
      succes: false,
      message: "invalid email or password",
    });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "invalid email or password",
    });
  }

  const token = await captain.generateAuthToken();

  captain.password = undefined;

  res.cookie("token", token, {
    expires: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success:true,
    captain,
    token
  })
};

const getCaptainProfile=async(req,res)=>{
    const captain=req.captain
  
    res.status(200).json({
      success:true,
      captain
    })

}

const logoutCaptain=async(req,res)=>{
  res.clearCookie('token', {
    httpOnly: true,
  } )

  res.status(200).json({
    success:true,
    message:"logout successfully"
  })
}

export { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };
