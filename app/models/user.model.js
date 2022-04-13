import mongoose from "mongoose";
import usersSchema from "../schemas/users-schema.js"

    const User = mongoose.model(
        "user",
        usersSchema
    );

export default User;