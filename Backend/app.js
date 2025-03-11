import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectToDB from './DB/db.js'
import userRoutes from './Routes/user.routes.js'

dotenv.config()
 
const app=express()

connectToDB()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/', (req, res)=>{
    res.send('hello')
})

app.use('/users', userRoutes)

export default app 