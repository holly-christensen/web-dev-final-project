dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.episode = require("./episode.model.js")(mongoose);
db.podcast = require("./podcast.model.js")(mongoose);
db.admin = require("./admin.model.js")(mongoose);
db.creator = require("./creator.model.js")(mongoose);
db.review = require("./review.model.js")(mongoose);
db.comment = require("./comment.model.js")(mongoose);

module.exports = db;