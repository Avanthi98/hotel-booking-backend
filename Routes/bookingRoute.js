import express from "express";
import {
  createBookingUsingCategory,
  deleteBooking,
  getAllBookings,
  getBookingByBookingId,
  makeABooking,
  retrieveBookingByDate,
  updateBookingDetails,
} from "../Controllers/bookingControllers.js";

const bookingRouter = express.Router();

bookingRouter.post("/", makeABooking);
bookingRouter.post("/filter-date", retrieveBookingByDate);
bookingRouter.get("/", getAllBookings);
bookingRouter.get("/:bookingId", getBookingByBookingId);
bookingRouter.put("/:bookingId", updateBookingDetails);
bookingRouter.delete("/:bookingId", deleteBooking);
bookingRouter.post("/create-by-category", createBookingUsingCategory);

export default bookingRouter;
