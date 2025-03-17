import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectToDB from './DB/db.js'
import userRoutes from './Routes/user.routes.js'
import captainRoutes from './Routes/captain.routes.js'
import mapRoutes from './Routes/maps.router.js'
import cookieParser from 'cookie-parser'


dotenv.config()
 
const app=express()

connectToDB()
app.use(cors({
    origin: "http://localhost:5173", // Explicitly allow your frontend origin
    credentials: true // Allow cookies to be sent
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/', (req, res)=>{
    res.send('hello')
})

app.use('/users', userRoutes)
app.use('/captain', captainRoutes)
app.use('/maps',mapRoutes )

export default app 