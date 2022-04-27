const podcastsSchema = require("../schemas/podcasts-schema.js");

module.exports = mongoose => {
    const Podcast = mongoose.model(
        "Podcast",
        podcastsSchema
    );
    return Podcast;
};