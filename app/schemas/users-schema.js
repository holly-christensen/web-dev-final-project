import mongoose from "mongoose";
import reviewsSchema from "./reviews-schema.js"
import commentsSchema from "./comments-schema.js";
import podcastsSchema from "./podcasts-schema.js";

const usersSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        phoneNumber: String,
        profileImg: String,
        email: String,
        credentials: {
            username: String,
            password: String,
        },
        type: {
            type: String,
            enum:['USER_CREATOR', 'USER_ADMIN', 'USER_CONSUMER'],
            default: 'CONSUMER'
        },
        following: [{podcastsSchema}],
        comments: [{commentsSchema}],
        reviews: [{reviewsSchema}]
    },
    {timestamps: true}, {collection: "users"})

export default usersSchema;

