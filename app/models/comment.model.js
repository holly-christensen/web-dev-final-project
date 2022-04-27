import commentsSchema from "../schemas/comments-schema.js";
import mongoose from "mongoose";

const Comment = mongoose.model(
    "Comment",
    commentsSchema
);

export default Comment;