import mongoose from "mongoose";
import commentsSchema from "./comments-schema.js";

const episodesSchema = mongoose.Schema({
        episodeId: String,
        podcastId: String,
        creatorId: String,
        title: String,
        description: String,
        imageUrl: String,
        comments: [{commentsSchema}]
    },
    {timestamps: true}, {collection: "episodes"})

export default episodesSchema;

