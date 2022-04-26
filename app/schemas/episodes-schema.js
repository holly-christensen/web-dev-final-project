import mongoose from "mongoose";
import commentsSchema from "./comments-schema.js";

const episodesSchema = mongoose.Schema({
        episodeId: String,
        podcastId: String,
        creatorId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Creator'
        },
        title: String,
        description: String,
        imageUrl: String,
        comments: [{commentsSchema}]
    },
    {timestamps: true}, {collection: "episodes"})

export default episodesSchema;

