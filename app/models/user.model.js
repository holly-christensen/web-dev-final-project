module.exports = mongoose => {
    const User = mongoose.model(
        "user",
        mongoose.Schema(
            {
                firstName: String,
                lastName: String,
                profileImg: Blob,
                credentials: {
                    username: String,
                    email: String,
                    password: String,
                },
                isAdmin: Boolean
            },
            {timestamps: true}
        )
    );
    return User;
};