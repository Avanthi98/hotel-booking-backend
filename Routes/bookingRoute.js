import express from "express";
import { getAllBookings, makeABooking } from "../Controllers/bookingControllers.js";

const bookingRouter=express.Router();

bookingRouter.post("/",makeABooking);
bookingRouter.get("/",getAllBookings);

export default bookingRouter;