import express from "express";
import { getAllBookings, getBookingByBookingId, makeABooking, updateBookingDetails } from "../Controllers/bookingControllers.js";

const bookingRouter=express.Router();

bookingRouter.post("/",makeABooking);
bookingRouter.get("/",getAllBookings);
bookingRouter.get("/:bookingId",getBookingByBookingId);
bookingRouter.put("/:bookingId",updateBookingDetails);

export default bookingRouter;