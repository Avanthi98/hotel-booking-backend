import Room from "../Models/roomModel.js"
import { isAdminValid } from "./userControllers.js";

//Create rooms
export function createRooms(req,res){
    if(!isAdminValid(req)){
        res.status(403).json({
            message:"Forbidden"
        })
        return;
    }
    const newRoom=new Room(req.body);
    newRoom.save().then(
        (result)=>{
            res.json({
                message:"Room created successfully",
                result:result
            })
        }
    ).catch(
        (err)=>{
            res.json({
                message:"Room creation failed",
                error:err
            })
        }
    )

}

//Delete Room
export function deleteRoom(req,res){
    if(!isAdminValid){
        res.json({
            message:"Forbidden"
        })
        return;
    }
    
    const roomId=req.params.roomId;
    Room.findOneAndDelete({roomId:roomId}).then(
        ()=>{
            res.json({
                message:"Room deleted successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message:"Room deletion failed"
            })
        }
    )
}

//Get Room List
export function getRoomList(req,res){
    Room.find().then(
        (roomList)=>{
            res.json({
                message:"Room list successfully found",
                roomList:roomList
            })
        }
    ).catch(
        ()=>{
            res.json({
                message:"Room List not found"
            })
        }
    )
}

//Get special room by searching room id
export function getRoomByRoomId(req,res){

    const roomId=req.params.roomId;

    Room.findOne({roomId:roomId}).then(
        (result)=>{
            if(result==null){
                res.json({
                    message:"Room not found.There is no such a room"
                })
                return;
            }
            else{
                res.json({
                    message:"Room found successfully",
                    result:result
                })
            }
        }
    ).catch(
        (err)=>{
            res.json({
                message:"Failed to get rooom details",
                error:err
            })
        }
    )
}
//Find rooms by Room category
export function findRoomsByCategory(req,res){
    const category=req.params.category;
    Room.find({category:category}).then(
        (result)=>{
            res.json({
                message:"Roooms belongs to this category found successfully",
                result:result
            })
        }
    ).catch(
        ()=>{
            res.json({
                message:"Failed to get rooms belongs to this category"
            })
        }
    )
}



//Update function
export function updateRoom(req,res){
    if(!isAdminValid(req)){
        res.json({
            message:"Forbidden"
        })
        return;
    }

    const roomId=req.params.roomId;
    Room.findOneAndUpdate({roomId:roomId},req.body).then(
        ()=>{
            res.json({
                message:"Updated room details successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message:"Failed to update room details"
            })
        }
    )
}
