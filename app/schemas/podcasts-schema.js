import mongoose from "mongoose";
import episodesSchema from "./episodes-schema.js";
import reviewsSchema from "./reviews-schema.js";
import creatorsSchema from "./creators-schema.js";

const podcastsSchema = mongoose.Schema({
        podcastId: String,
        creator: {creatorsSchema},
        title: String,
        description: String,
        imageUrl: String,
        language: String,
        episodes: [{episodesSchema}],
        reviews: [{reviewsSchema}]
    },
    {timestamps: true}, {collection: "podcasts"})

export default podcastsSchema;

