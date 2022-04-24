import mongoose from "mongoose";
import creatorsSchema from "../schemas/creators-schema.js"

    const Creator = mongoose.model(
        "creator",
        creatorsSchema
    );

export default Creator;
