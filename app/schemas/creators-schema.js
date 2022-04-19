import mongoose from "mongoose";

const creatorsSchema = mongoose.Schema({
        userId: String,
        podcastId: String,
        podcastName: String,
        funFact: String,
        boringFact: String,
    },
    {timestamps: true}, {collection: "creators"})

export default creatorsSchema;