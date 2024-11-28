import Booking from "../Models/bookingModel.js";
import Room from "../Models/roomModel.js";
import { isAdminValid, isCustomerValid } from "./userControllers.js";

//Make a booking function-Only for Customers
export function makeABooking(req, res) {
  if (!isCustomerValid(req)) {
    res.json({
      message: "Forbidden",
    });
    return;
  }

  const startingId = 1200;
  Booking.countDocuments({})
    .then((count) => {
      const newId = startingId + count + 1; //countDocuments() function will return the count of database records
      //So count variable will return the count

      const newBooking = new Booking({
        bookingId: newId,
        roomId: req.body.roomId,
        clientEmail: req.user.email,
        start: req.body.start,
        end: req.body.end,
      });

      newBooking
        .save()
        .then((result) => {
          res.json({
            message: "Booking created successfully",
            result: result,
          });
        })
        .catch((err) => {
          res.json({
            message: "Booking creation failed",
            error: err,
          });
        });
    })
    .catch(() => {
      res.json({
        message: "Booking creation failed due to database connection failure",
      });
    });
}

//Get and view all bookings
export function getAllBookings(req, res) {
  const user = req.user;
  if (user == null) {
    //If not user
    res.json({
      message: "You are not authorized.Please log into the system",
    });
    return;
  }

  //If it's a customer
  if (isCustomerValid(req)) {
    Booking.find({ clientEmail: req.user.email })
      .then((result) => {
        res.json({
          message: "Successfully loaded all your booking details",
          result: result,
        });
      })
      .catch((err) => {
        res.json({
          message: "Failed to load your booking details",
          error: err,
        });
      });
    return;
  }
  //If it's an admin
  Booking.find()
    .then((result) => {
      res.json({
        message: "Booking details successfully loaded",
        result: result,
      });
    })
    .catch((err) => {
      res.json({
        message: "Booking details loading failed",
        error: err,
      });
    });
}

//Get booking details by bookingId-Only for Admin
export function getBookingByBookingId(req, res) {
  if (!isAdminValid(req)) {
    res.json({
      message: "Forbidden",
    });
    return;
  }

  const BookingId = req.params.bookingId;
  Booking.findOne({ bookingId: BookingId })
    .then((result) => {
      res.json({
        message: "Successfully loaded the booking details",
        result: result,
      });
    })
    .catch(() => {
      res.json({
        message: "Failed to load booking details",
      });
    });
}

//Update booking details-for Customers
export function updateBookingDetails(req, res) {
  if (!isCustomerValid(req)) {
    res.json({
      message: "Forbidden",
    });
    return;
  }
  const bookingId = req.params.bookingId;
  Booking.findOneAndUpdate({ bookingId: bookingId }, req.body)
    .then(() => {
      res.json({
        message: "Booking details updated successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "Failed to update booking details",
      });
    });
}

//Filterb by date
export function retrieveBookingByDate(req, res) {
  if (isAdminValid(req)) {
    const start = req.body.start;
    const end = req.body.end;

    console.log(start);
    console.log(end);

    Booking.find({
      start: {
        $gte: start,
      },
      end: {
        $lt: end,
      },
    })
      .then((result) => {
        res.json({
          message: "Filtered bookings",
          result: result,
        });
      })
      .catch((error) => {
        res.json({
          message: "Failed to get filtered bookings",
          error: error,
        });
      });
    return;
  } else {
    res.json({
      message: "Forbidden!",
    });
  }
}

//Delete booking
export function deleteBooking(req, res) {
  if (isAdminValid(req)) {
    const bookingId = req.params.bookingId;
    Booking.findOneAndDelete({ bookingId: bookingId })
      .then((result) => {
        res.json({
          message: "Booking deleted successfully!",
          res: result,
        });
      })
      .catch((error) => {
        res.json({
          message: "Failed to delete booking",
          err: error,
        });
      });
    return;
  } else {
    res.json({
      message: "Forbidden",
    });
  }
}

//Create booking without crashing
export function createBookingUsingCategory(req, res) {
  const start = new Date(req.body.start);
  const end = new Date(req.body.end);
  Booking.find({
    $or: [
      {
        start: {
          $gte: start,
          $lt: end,
        },
      },
      {
        end: {
          $gt: start,
          $lte: end,
        },
      },
    ],
  }).then((response) => {
    const overlappingBookings = response;
    const rooms = [];
    for (let i = 0; i < overlappingBookings.length; i++) {
      rooms.push(overlappingBookings[i].roomId);
    }
    Room.find({
      roomId: {
        $nin: rooms,
      },
    }).then((rooms) => {
      if (rooms.length == 0) {
        res.json({
          message: "No rooms available!!!",
        });
      } else {
        const startingId = 1200;
        Booking.countDocuments({})
          .then((count) => {
            const newId = startingId + count + 1; //countDocuments() function will return the count of database records
            //So count variable will return the count

            const newBooking = new Booking({
              bookingId: newId,
              roomId: rooms[0].roomId,
              clientEmail: req.user.email,
              start:start,
              end:end,
            });

            newBooking
              .save()
              .then((result) => {
                res.json({
                  message: "Booking created successfully",
                  result: result,
                });
              })
              .catch((err) => {
                res.json({
                  message: "Booking creatiion failed",
                  error: err,
                });
              });
          })
          .catch(() => {
            res.json({
              message:
                "Booking creation failed due to database connection failure",
            });
          });
      }
    });
  });
}