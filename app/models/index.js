dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Pormise.
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
dv.tutorials = require("./show.model.js")