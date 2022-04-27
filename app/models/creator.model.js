import mongoose from "mongoose";
import creatorsSchema from "../schemas/creators-schema.js"

    const Creator = mongoose.model(
        "Creator",
        creatorsSchema
    );

export default Creator;
