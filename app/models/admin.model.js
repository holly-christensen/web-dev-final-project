const adminsSchema = require("../schemas/admins-schema.js");
module.exports = mongoose => {
    const Admin = mongoose.model(
        "admin",
        adminsSchema
    );
    return Admin;
};