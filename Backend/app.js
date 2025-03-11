import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectToDB from './DB/db.js'


dotenv.config()
 
connectToDB()
const app=express()
app.use(cors())

app.get('/', (req, res)=>{
    res.send('hello')
})


export default app 