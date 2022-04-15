import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
        episodeId: String,
        userId: String,
        body: String,
        datePosted: String,
        likes: {
                count: Number,
                likedBy: [{userId: String}]
        },
        dislikes: Number
    },
    {timestamps: true}, {collection: "comments"})

export default commentsSchema;