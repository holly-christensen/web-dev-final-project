import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema({
        podcastId: String,
        userId: String,
        rating: String,
        title: String,
        body: String,
        datePosted: String
    },
    {timestamps: true}, {collection: "reviews"})

export default reviewsSchema;