import express from "express";
import { createFeedback} from "../Controllers/feedbackController.js";

//Create the feedback router
const feedbackRouter=express.Router();

feedbackRouter.post("/",createFeedback);

//Exporting the feedback router
export default feedbackRouter;
