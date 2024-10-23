import Booking from "../Models/bookingModel.js";
import { isCustomerValid } from "./userControllers.js";


//Make a booking function
export function makeABooking(req,res){
    if(!isCustomerValid(req)){
        res.json({
            message:"Forbidden"
        })
        return;
    }

    const startingId=1200;
    Booking.countDocuments({}).then(
        (count)=>{
           const newId = startingId + count + 1; //countDocuments() function will return the count of database records
            //So count variable will return the count

            const newBooking=new Booking({
                bookingId:newId,
                roomId:req.body.roomId,
                clientEmail:req.user.email,
                start:req.body.start,
                end:req.body.end
            })

            newBooking.save().then(
                (result)=>{
                    res.json({
                        message:"Booking created successfully",
                        result:result
                    })
                }
            ).catch(
                (err)=>{
                    res.json({
                        message:"Booking creatiion failed",
                        error:err
                    })
                }
            )
        }
        ).catch(
            ()=>{
                res.json({
                    message:"Booking creation failed due to database connection failure"
                })
            }
        )
}

//Get and view all bookings-for admin
export function getAllBookings(req,res){
    const user=req.user;
    if(user==null){
        res.json({
            message:"You are not authorized.Please log into the system"
        })
        return;
    }

    if(isCustomerValid(req,res)){
    
        Booking.find({clientEmail:req.user.email}).then(
            (result)=>{
                res.json({
                    message:"Successfully loaded all your booking details",
                    result:result
                })
            }
        ).catch(
            (err)=>{
                res.json({
                    message:"Failed to load your booking details"
                })
            }
        )
        return;
    }
    Booking.find().then(
        (result)=>{
            res.json({
                message:"Booking details successfully loaded",
                result:result
            })
        }
    ).catch(
        ()=>{
            res.json({
                message:"Booking details loading failed"
            })
        }
    )
}