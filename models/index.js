const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.user = require("./User");
db.transaction = require("./Transaction");

module.exports = db;
