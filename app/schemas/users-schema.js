import mongoose from "mongoose";

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
        following: [{podcastId: String}]
    },
    {timestamps: true}, {collection: "users"})

export default usersSchema;

