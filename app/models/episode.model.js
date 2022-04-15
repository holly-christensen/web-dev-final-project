const episodesSchema = require("../schemas/episodes-schema.js");
module.exports = mongoose => {
    const Episode = mongoose.model(
        "episode",
        episodesSchema
    );
    return Episode;
};