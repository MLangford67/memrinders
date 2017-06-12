"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");
var passport = require("passport");
var port = process.env.PORT || 3000;
var app = express();
require("./models/user");
require("./config/passport");
mongoose.connect("mongodb://localhost/facebookAuth");
app.use(express.static(__dirname + "/bower_components"));
app.use(express.static(__dirname + "/public"));
app.engine('.html', require("ejs").renderFile);
app.set("view engine", 'ejs');
app.set('views', path.join(__dirname));
app.set("view options", { layout: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
var userRoutes = require("./routes/userRoutes");
app.use('/v1/api', userRoutes);
app.get("/*", function (req, res) {
    res.render("index");
});
exports.server = app.listen(port, function () {
    console.log("Server is listening on localhost:" + port);
});
