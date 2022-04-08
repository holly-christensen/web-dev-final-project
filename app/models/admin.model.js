module.exports = mongoose => {
    const Admin = mongoose.model(
        "admin",
        mongoose.Schema(
            {
                adminId: String,
                userId: String,
                nemesis: String
            },
            { timestamps: true }
        )
    );
    return Admin;
};