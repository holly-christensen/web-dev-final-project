import mongoose from "mongoose";
import episodesSchema from "./episodes-schema.js";
import reviewsSchema from "./reviews-schema.js";
import creatorsSchema from "./creators-schema.js";

const podcastsSchema = mongoose.Schema({
        podcastId: String,
        creatorId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Creator'
        },
        title: String,
        description: String,
        imageUrl: String,
        language: String,
        episodes: [{episodeId: String}],
        followers: [{userId: String}],
        reviews: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review'
        }]
    },
    {timestamps: true}, {collection: "podcasts"})

export default podcastsSchema;

