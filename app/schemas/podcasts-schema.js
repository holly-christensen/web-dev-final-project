import mongoose from "mongoose";

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

