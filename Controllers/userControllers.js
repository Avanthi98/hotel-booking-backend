import User from "../Models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

//Function for Getting user list
export function getUsers(req,res){
    if(!isAdminValid(req)){
        res.json({
            message:"Forbidden"
        })
        return;
    }
    User.find().then(
        (usersList)=>{
            res.json({
                List:usersList
            })
        })
}

//Function for get user
export function getOneUser(req,res){
    const user=req.user;
    if(user==null){
        res.json(
            {
                message:"User not found"
            }
        )
    }
    else{
        res.json(
            {
                message:"User found",
                user:user
            }
        )
    }

}

//Function for creating users
export function postUsers(req, res) {
    const user = req.body;
    const password = req.body.password;

    // Hash the password using bcrypt with salt rounds (e.g., 10)
    bcrypt.hash(password, 10, (err, passwordHash) => {
        if (err) {
            return res.status(500).json({ message: "Error hashing password" });
        }
        
        user.password = passwordHash;

        const newUser = new User(user);
        newUser.save()
            .then(() => {
                res.json(
                    { message: "User Created Successfully",
                        user:user 

                    });
            })
            .catch(() => {
                res.status(500).json({ message: "User creation failed" });
            });
    });
}

//Create User Login
export function loginUser(req, res) {
    const credentials = req.body;

    User.findOne({ email: credentials.email }).then((user) => {
        if (!user) {
            return res.status(403).json({ message: "User not found" });
        }

        // Compare the provided password with the stored hashed password
        bcrypt.compare(credentials.password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: "Error during password verification" });
            }

            if (!isMatch) {
                return res.status(403).json({ message: "Incorrect password" });
            }

            const payload = {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                type: user.type,
            };

            // Sign the token with the payload and secret
            const token = jwt.sign(payload,process.env.JWT_KEY, { expiresIn: "1h" });

            res.status(200).json({
                message: "User logged in successfully",
                user:user,
                token: token,
            });
        });
    }).catch(() => {
        res.status(500).json({ message: "Login failed" });
    });
}


  //This put function is used to update a user
export function putUsers(req,res){
    res.json({
        message:"This is a put request"
    })
}

//Function for deleting users
export function deleteUsers(req,res){
    const returnEmail=req.body.email
    User.deleteOne({email:returnEmail}).then(
        ()=>{
            res.json({
                message:"User deleted successfully"
            })
        }
        
    ).catch(
        ()=>{
            res.json({
                message:"User deletion failed"
            })
            
        })
}

//isAdminValid Function-->This function is used to reduce code redunduncy
export function isAdminValid(req){
    if(req.user==null){
        return false;
    }
    if(req.user.type!="admin"){
        return false;
    }
        return true;
}

//Check whether the user is a customer or not
export function isCustomerValid(req){
    if(req.user==null){
        return false;
    }
    if(req.user.type!="customer"){
        return false;
    }
    return true;
}