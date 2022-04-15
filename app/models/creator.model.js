const creatorsSchema = require("../schemas/creators-schema.js");
module.exports = mongoose => {
    const Creator = mongoose.model(
        "creator",
        creatorsSchema
    );
    return Creator;
};