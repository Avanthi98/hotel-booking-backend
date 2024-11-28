import express from "express";
import { createFeedback, getAllFeedbacks, updateFeedbackDetails} from "../Controllers/feedbackController.js";

//Create the feedback router
const feedbackRouter=express.Router();

feedbackRouter.post("/",createFeedback);
feedbackRouter.get("/",getAllFeedbacks);
feedbackRouter.put("/:feedbackId",updateFeedbackDetails)

//Exporting the feedback router
export default feedbackRouter;
