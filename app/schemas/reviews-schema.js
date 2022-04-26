import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema({
        podcastId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Podcast'
        },
        userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
        },
        rating: String,
        title: String,
        body: String,
        datePosted: String
    },
    {timestamps: true}, {collection: "reviews"})

export default reviewsSchema;