var express = require("express"),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    expressSanitizer = require("express-sanitizer"),
    app = express();

mongoose.connect("mongodb://localhost/tweeps_book", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
    }).then(function () {
        console.log("Connected to DB");
    }).catch(function (err) {
        console.log("ERROR:", err.message);
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(expressSanitizer());

app.get("/", function (req, res) {
    console.log("Hello World");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});