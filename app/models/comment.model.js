const commentsSchema = require("../schemas/comments-schema.js");
module.exports = mongoose => {
    const Comment = mongoose.model(
        "comment",
        commentsSchema
    );
    return Comment;
};