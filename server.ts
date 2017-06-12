import express = require("express");
import bodyParser = require("body-parser");
import path = require("path");
import mongoose = require("mongoose");
import passport = require("passport");

let port = process.env.PORT || 3000;
let app = express();

require("./models/user");
require("./config/passport");
mongoose.connect("mongodb://localhost/facebookAuth");

app.use(express.static(__dirname + "/bower_components"));
app.use(express.static(__dirname + "/public"));
app.engine('.html', require("ejs").renderFile);
app.set("view engine", 'ejs');
app.set('views', path.join(__dirname));
app.set("view options", { layout: false });
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(passport.initialize());

let userRoutes = require("./routes/userRoutes");
app.use('/v1/api', userRoutes);

app.get("/*", function(req, res) {
	res.render("index");
});

export let server = app.listen(port, function() {
  console.log(`Server is listening on localhost:${port}`);
});
