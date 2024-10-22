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