import reviewsSchema from "../schemas/reviews-schema.js";
import mongoose from "mongoose";

const Review = mongoose.model(
    "Review",
    reviewsSchema
);

export default Review;