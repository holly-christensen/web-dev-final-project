module.exports = mongoose => {
    const User = mongoose.model(
        "user",
        mongoose.Schema(
            {
                userId: String,
                firstName: String,
                lastName: String,
                phoneNumber: String,
                profileImg: Blob,
                credentials: {
                    username: String,
                    email: String,
                    password: String,
                },
                type: String,
                following: [{podcastId: String}]
            },
            {timestamps: true}
        )
    );
    return User;
};