import {Router} from 'express'
import { isLoggedIn } from '../Middlewares/auth.middleware.js'
import { getAutoCompleteSuggestions, getCoordinates, getDistanceTime } from '../Controllers/map.controller.js'
import { query } from 'express-validator'

const router=Router()

router.get('/get-coordinates', 
    query('address').isString().isLength({min:3}),
    isLoggedIn , getCoordinates )

router.get('/get-distance-time', 
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    isLoggedIn, getDistanceTime
)    

router.get('/get-suggestions', query('input').isString(), isLoggedIn, getAutoCompleteSuggestions)

export default router;