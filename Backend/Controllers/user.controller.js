import { User } from "../Models/user.schema.js";
import { createUser } from "../service/user.service.js";
import { validationResult } from "express-validator";

const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { fullName, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email is already registered");
  }

  const user = await createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password,
  });

  user.password = undefined;

  const token = user.generateAuthToken();

  res.status(200).json({
    success: true,
    token,
    user,
  });
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const {email, password}=req.body;

  const user=await User.findOne({email}).select("+password")

  if(!user){
    return res.status(401).json({
        message:"invalid email or password"
    })
  }

  const isMatch=await user.comparePassword(password)

  if(!isMatch){
    return res.status(401).json({
        message:"invalid password"
    }) 
  }

  const token= await user.generateAuthToken()

  user.password=undefined

  res.cookie('token', token)

  res.status(200).json({
    success:true,
    token,
    user
  })

};

const getUserProfile=async (req, res)=>{
    const user=req.user
    res.status(200).json({
        success:true,
        user
    })
}

export { registerUser, loginUser, getUserProfile };
