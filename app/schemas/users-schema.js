import mongoose from "mongoose";
import reviewsSchema from "./reviews-schema.js"
import commentsSchema from "./comments-schema.js";
import podcastsSchema from "./podcasts-schema.js";

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
        following: [{podcastsSchema}],
        comments: [{commentsSchema}],
        reviews: [{reviewsSchema}]
    },
    {timestamps: true}, {collection: "users"})

export default usersSchema;

