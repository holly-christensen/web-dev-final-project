import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
        episodeId: String,
        userId: String,
        body: String,
        datePosted: String,
        likes: Number,
        dislikes: Number
    },
    {timestamps: true}, {collection: "comments"})

export default commentsSchema;