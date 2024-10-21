import express from 'express'
import bodyParser from "body-parser"

//Importing Routers
import userRouter from './Routes/usersRoute.js'
import galleryItemRouter from './Routes/galleryItemsRoute.js'
import categoryRouter from './Routes/categoryRoute.js'

//Import mongoose-->no need to write in hands
import mongoose from 'mongoose'

//Import JWT
import jwt from "jsonwebtoken"

//Import and configurate dotenv
import dotenv from "dotenv"
dotenv.config()

//Making the express app for backend
const app=express()

//This is a pre-builded middleware
app.use(bodyParser.json())

//Connect database connection string
const dbConnectionString=process.env.MONGO_URL

//Create authentication middleware
app.use((req,res,next)=>{
    const token=req.header("Authorization")?.replace("Bearer ","")//You must keep a space after word "Bearer "
    if(token!=null){//If there is a token and token is correct
        jwt.verify(token,process.env.JWT_KEY,
            (err,decoded)=>{
            if(decoded!=null){//If Decription successfull
                req.user=decoded
                next()
            }else{
                next()//while decode failure
            }
        })
    }else{
        next()
    }
})

//Connect to the database-->mongoose.connect(dbConnctionString) and check the connection
mongoose.connect(dbConnectionString).then(
    ()=>{
        console.log("Connected to the database")
    }
).catch(
    ()=>{
        console.log("Connection Failed")
    }
)

//Use Routers
app.use("/api/users",userRouter)
app.use("/api/gallery",galleryItemRouter)
app.use("/api/category",categoryRouter)

//Starting the backend server
app.listen(5000,(req,res)=>{
    console.log("Server is running on port 5000")
});