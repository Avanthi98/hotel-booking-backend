import mongoose from "mongoose";

const feedbackSchema =new mongoose.Schema({
  feedbackId: {
    type: Number,
    required: true,
    unique: true,
  },
  clientEmail: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    maxlength: 500,
  },
  status: {
    type: String,
    status: ["Pending", "Approved", "Rejected"], // Restrict possible values
    default: "Pending", // Default status is "Pending"
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Creating the Feedback model
const Feedback = mongoose.model("Feedbacks", feedbackSchema);
export default Feedback;
