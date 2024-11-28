import Feedback from "../Models/feedbackModel.js";
import { isCustomerValid } from "./userControllers.js";

//Create feedbacks-->Customer
export function createFeedback(req,res) {
  if (!isCustomerValid(req)) {
    res.json({
      message: "You are not authorized to create feedbacks",
    });
    return;
  }
  const startingId = 100;
  Feedback.countDocuments({})
    .then((count) => {
      const newId = startingId + count + 1;

      const newFeedback = new Feedback({
        feedbackId: newId,
        clientEmail: req.user.email,
        rating: req.body.rating,
        comment: req.body.comment,
       
      });
      newFeedback
        .save().then(
            (result) => {
          res.json({
            message: "Feedback saved successfully",
            result: result,
          });
        })
        .catch((err) => {
          res.json({
            message: "Failed to write the feedback",
            error:err
          });
        });
    })
    .catch(() => {
        res.json({
          message: "Feedback creation failed due to the database error"
        });
      });
}
