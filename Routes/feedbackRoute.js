import express from "express";
import { createFeedback, getAllFeedbacks} from "../Controllers/feedbackController.js";

//Create the feedback router
const feedbackRouter=express.Router();

feedbackRouter.post("/",createFeedback);
feedbackRouter.get("/",getAllFeedbacks);

//Exporting the feedback router
export default feedbackRouter;
