import mongoose from "mongoose";

const adminsSchema = mongoose.Schema({
        userId: String,
        body: String,
        nemesis: String,
        favoriteAnimal: String,
    },
    {timestamps: true}, {collection: "admins"})

export default adminsSchema;