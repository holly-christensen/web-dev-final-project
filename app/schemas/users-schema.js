import mongoose from "mongoose";


const usersSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        phoneNumber: String,
        email: String,
        credentials: {
            username: String,
            password: String,
        },
        type: {
            type: String,
            enum:['USER_CREATOR', 'USER_ADMIN', 'USER_CONSUMER'],
            default: 'USER_CONSUMER'
        },
        following: [{podcastId: String}],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }]
    },
    {timestamps: true}, {collection: "users"})

export default usersSchema;

