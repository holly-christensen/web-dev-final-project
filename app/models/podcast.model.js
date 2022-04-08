module.exports = mongoose => {
    const Podcast = mongoose.model(
        "podcast",
        mongoose.Schema(
            {
                podcastId: String,
                creatorId: String,
                episodes: [{episodeId: String}]
            },
            { timestamps: true }
        )
    );
    return Podcast;
};