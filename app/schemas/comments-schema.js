import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
        episodeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Episode'
        },
        userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
        },
        body: String,
        datePosted: String,
        likes: {
                count: Number,
                likedBy: [{userId: {
                                type: mongoose.Schema.Types.ObjectId,
                                ref: 'User'
                        }}]
        },
        dislikes: Number
    },
    {timestamps: true}, {collection: "comments"})

export default commentsSchema;