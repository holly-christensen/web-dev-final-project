import mongoose from "mongoose";

const adminsSchema = mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        body: String,
        nemesis: String,
        favoriteAnimal: String,
    },
    {timestamps: true}, {collection: "admins"})

export default adminsSchema;