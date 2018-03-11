var express = require("express");
var morgan = require("morgan");
var path = require("path");
var fs = require("fs");

var app = express();

app.use(morgan("short"));

var staticPath = path.join(__dirname, "static");
app.use(express.static(staticPath));

app.use(function(req, res, next) {
    console.log("Requestn IP:" + req.url);
    console.log("Requestn date:" + new Date());
    next();
});

app.use(function(req, res, next) {
    res.status(404);
    res.send("File not found.");
});

app.listen(3000, function() {
    console.log("App started on port 3000");
});
