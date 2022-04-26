import mongoose from "mongoose";

const creatorsSchema = mongoose.Schema({
        userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
        },
        podcastId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Podcast'
        },
        podcastName: String,
        funFact: String,
        boringFact: String,
    },
    {timestamps: true}, {collection: "creators"})

export default creatorsSchema;