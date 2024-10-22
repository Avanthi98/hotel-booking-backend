import express from "express";
import { makeABooking } from "../Controllers/bookingControllers.js";

const bookingRouter=express.Router();

bookingRouter.post("/",makeABooking);

export default bookingRouter;