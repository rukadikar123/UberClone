
import { Router } from 'express'
import {body} from 'express-validator'
import { registerUser, loginUser } from '../Controllers/user.controller.js'

const router=Router()

router.post('/register', [
    body('email').isEmail().withMessage("Invalid email"),
    body('fullName.firstName').isLength({min:3}).withMessage("firstName must be atleast 3 char"),
    body('password').isLength({min:6}).withMessage("password must be 6 char long")
], registerUser)

router.post('/login',[
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min:6}).withMessage("password must be 6 char long")
] , loginUser)


export default router