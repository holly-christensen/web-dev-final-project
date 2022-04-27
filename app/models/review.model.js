const reviewsSchema = require("../schemas/reviews-schema.js");

module.exports = mongoose => {
    const Review = mongoose.model(
        "Review",
        reviewsSchema
    );
    return Review;
};