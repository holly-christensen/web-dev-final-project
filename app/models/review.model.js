module.exports = mongoose => {
    const Review = mongoose.model(
        "review",
        mongoose.Schema(
            {
                ratingId: String,
                userId: String,
                podcastId: String,
                title: String,
                body: String,
                rating: Number,
                datePosted: String,
            },
            { timestamps: true }
        )
    );
    return Review;
};