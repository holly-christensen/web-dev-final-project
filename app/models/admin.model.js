const adminsSchema = require("../schemas/admins-schema.js");
module.exports = mongoose => {
    const Admin = mongoose.model(
        "Admin",
        adminsSchema
    );
    return Admin;
};