import express from 'express'
import bodyParser from "body-parser"

//Importing userRouter-->"export default"
import userRouter from './Routes/usersRoute.js'

//Importing galleryItemRouter
import galleryItemRouter from './Routes/galleryItemsRoute.js'

//Import mongoose-->no need to write in hands
import mongoose from 'mongoose'

//Import JWT
import jwt from "jsonwebtoken"
//Making the express app for backend
const app=express()

//This is a pre-builded middleware
app.use(bodyParser.json())

//Connect database connection string
const dbConnectionString="mongodb+srv://tester2:321@cluster0.sqrki.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//Create authentication middleware
app.use((req,res,next)=>{
    const token=req.header("Authorization")?.replace("Bearer","")
    if(token!=null){//If there is a token and token is correct
        jwt.verify(token,"secret",
            (err,decoded)=>{
            if(decoded=!null){//If Decription successfull
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

//Use userRouter
app.use("/api/users",userRouter)

//Use galleryItem router
app.use("/api/gallery",galleryItemRouter)

//Starting the backend server
app.listen(5000,(req,res)=>{
    console.log("Server is running on port 5000")
});