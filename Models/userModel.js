import mongoose from "mongoose"

//Creating the schema of the user that says what are the user details
//Details of user attributes
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,//Required detail-->defenetely want
        unique:true//These type details are unique
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true,
        default:"customer"
    },
    whatsApp:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    disabled:{
        type:Boolean,
        required:true,
        default:false
    },
    emailVerified:{
        type:Boolean,
        required:true,
        default:false
    }
})
//Creating the schema model
const User=mongoose.model("users",userSchema) //Here "users" is the database collection name on mongodb site
export default User;