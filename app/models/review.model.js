import reviewsSchema from "../schemas/reviews-schema.js";
import mongoose from "mongoose";


const Review = mongoose.model(
    "Review",
    reviewsSchema
);

export default Review;

// const newReview =
//
//     db.reviews.insert({
//     "podcastId": "924372",
//     "userId": {"_id": "626bef2d2133bcf6a909600c"},
//     "username": "wer",
//     "rating": "5",
//     "title": "very fun podcast",
//     "body": "super gay too",
//     "datePosted": "4/29/2022"
// })