import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
        episodeId: String,
        podcastId: String,
        userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
        },
        username: String,
        body: String,
        datePosted: String,
        likes: {
                count: Number,
                likedBy: [{userId: {
                                type: mongoose.Schema.Types.ObjectId,
                                ref: 'User'
                        }}]
        },
        dislikes: {
                count: Number,
                dislikedBy: [{userId: {
                                type: mongoose.Schema.Types.ObjectId,
                                ref: 'User'
                        }}]
        },
    },
    {timestamps: true}, {collection: "comments"})

export default commentsSchema;