import mongoose from "mongoose";
import podcastsSchema from "../schemas/podcasts-schema.js";

const Podcast = mongoose.model(
    "Podcast",
    podcastsSchema)

export default Podcast;