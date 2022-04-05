module.exports = mongoose => {
    const Comment = mongoose.model(
        "comment",
        mongoose.Schema(
            {
                body: String,
                datePosted: String,
                userId: String,
                likes: Number,
                dislikes: Number,
            },
            { timestamps: true }
        )
    );
    return Comment;
};