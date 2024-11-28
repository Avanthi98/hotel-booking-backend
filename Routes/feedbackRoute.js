import express from "express";
import { createFeedback, deleteFeedback, getAllFeedbacks, updateFeedbackDetails} from "../Controllers/feedbackController.js";

//Create the feedback router
const feedbackRouter=express.Router();

feedbackRouter.post("/",createFeedback);
feedbackRouter.get("/",getAllFeedbacks);
feedbackRouter.put("/:feedbackId",updateFeedbackDetails);
feedbackRouter.delete("/:feedbackId",deleteFeedback)

//Exporting the feedback router
export default feedbackRouter;
