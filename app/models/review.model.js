module.exports = mongoose => {
    const Review = mongoose.model(
        "review",
        mongoose.Schema(
            {
                title: String,
                body: String,
                rating: Boolean,
                datePosted: String,
                userId: String,
            },
            { timestamps: true }
        )
    );
    return Review;
};