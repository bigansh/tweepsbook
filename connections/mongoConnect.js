var mongoose = require("mongoose"),
    dotenv = require("dotenv");

dotenv.config();

var mongoObj = {}

mongoObj.connect = mongoose.connect(process.env.DATABASEURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(function () {
    console.log("Connected to DB");
}).catch(function (err) {
    console.log("ERROR:", err.message);
});

module.exports = mongoObj;