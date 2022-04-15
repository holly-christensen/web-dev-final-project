import mongoose from "mongoose";
import reviewsSchema from "./reviews-schema.js"
import episodesSchema from "./episodes-schema.js"

const usersSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        phoneNumber: String,
        profileImg: String,
        credentials: {
            username: String,
            email: String,
            password: String,
        },
        type: String,
        following: [{podcastId: String}],
        likes: [{episodesSchema}],
        reviews: [{reviewsSchema}]
    },
    {timestamps: true}, {collection: "users"})

export default usersSchema;

