import express from "express"

import{createRooms, deleteRoom, findRoomsByCategory, getRoomByRoomId, getRoomList, updateRoom} from "../Controllers/roomControllers.js"

const roomRouter=express.Router();//create room Router

roomRouter.post("/",createRooms);
roomRouter.delete("/:roomId",deleteRoom);
roomRouter.get("/",getRoomList);
roomRouter.get("/by-category/:category",findRoomsByCategory);
roomRouter.get("/:roomId",getRoomByRoomId);
roomRouter.put("/:roomId",updateRoom);


export default roomRouter;