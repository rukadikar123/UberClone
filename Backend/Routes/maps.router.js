import {Router} from 'express'
import { isLoggedIn } from '../Middlewares/auth.middleware.js'
import { getCoordinates } from '../Controllers/map.controller.js'
import { query } from 'express-validator'

const router=Router()

router.get('/get-coordinates', 
    query('address').isString().isLength({min:3}),
    isLoggedIn , getCoordinates )


export default router;