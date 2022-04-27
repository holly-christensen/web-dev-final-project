const episodesSchema = require("../schemas/episodes-schema.js");
module.exports = mongoose => {
    const Episode = mongoose.model(
        "Episode",
        episodesSchema
    );
    return Episode;
};