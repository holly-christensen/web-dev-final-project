import mongoose from "mongoose";
import creatorsSchema from "../schemas/users-schema.js"

    const Creator = mongoose.model(
        "creator",
        creatorsSchema
    );

export default Creator;
