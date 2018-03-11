var express = require("express");
var logger = require("morgan");
var http = require("http");
var path = require("path");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.use(logger("short"));

app.use(function(request, response, next) {
    console.log("In comes a " + request.method + " to " + request.url);
    next();
});

app.get("/", function(request, response) {
    response.render("index", {
        message: "welcome to my homepage"
    });
});

app.get("/about", function(request, response) {
    response.end("welcome to about homepage");
});

app.get("/weather", function(request, response) {
    response.end("welcome to weather homepage");
});

app.get("/hello/:who", function(request, response) {
    response.end("hello, " + request.params.who);
});

/** 
app.use(function(request, response) {
    response.writeHead(200, {"Content-type": "text/plain"});
    response.end("hello,world");
});
*/
app.use(function(request, response) {
    response.statusCode = 404;
    response.end("404!");
});

http.createServer(app).listen(3000);

