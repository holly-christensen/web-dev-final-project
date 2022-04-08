module.exports = mongoose => {
    const Creator = mongoose.model(
        "creator",
        mongoose.Schema(
            {
                creatorId: String,
                userId: String,
                funFact: String,
            },
            { timestamps: true }
        )
    );
    return Creator;
};