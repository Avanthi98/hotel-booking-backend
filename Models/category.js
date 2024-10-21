import mongoose from "mongoose"
const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    features:[
        {
            type:String //There are so many features in a room category.so it should be a string type array
        }
    ],
    image:{
        type:String
    }
})

const Category=mongoose.model("categories",categorySchema);
export default Category;