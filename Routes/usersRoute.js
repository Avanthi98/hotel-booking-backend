//Importing Express
import express from 'express'

//Importing User Functions from userControllers with only "export" (without "export default" keyword)
import { getUsers,putUsers,deleteUsers, postUsers, loginUser, getOneUser } from '../Controllers/userControllers.js'
//Making a router
const userRouter=express.Router()

//Making different types of requests
//userRouter.get("/",getUsers)  
userRouter.post("/",postUsers)
userRouter.put("/",putUsers)
userRouter.delete("/",deleteUsers)
userRouter.post("/login/",loginUser)
userRouter.get("/",getOneUser)

//Exporting the created userRouter
export default userRouter; 
/*userRouter is the major element in this doc.
default keyword is used when it exporting because of giving the priority for the exported element.
"export default" is completely difference than export keyword*/

