import mongoose from "mongoose"

const bookingSchema=new mongoose.Schema({
    bookingId:{
        type:Number,
        required:true,
        unique:true
    },
    clientEmail:{
        type:String,
        required:true
    },
    roomId:{
        type:Number,
        required:true
    },
    start:{
        type:Date,
        required:true
    },
    end:{
        type:Date,
        required:true
    },
    
    status:{
        type:String,
        required:true,
        default:"Pending"
    },
    reason:{
        type:String,
        default:""
    },
    timeStamp:{
        type:Date,
        default:Date.now
    },
    notes:{
        type:String,
        default:"" //If you want to add an additional thing
    }
})

const Booking=mongoose.model("Bookings",bookingSchema);
export default Booking;