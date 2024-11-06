import mongoose from "mongoose";

const galleryItemSchema=mongoose.Schema({
    eventId:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const GalleryItem=mongoose.model("galleryItems",galleryItemSchema)
export default GalleryItem;