var express = require("express");

var app = express();

app.get("/olivia", function(request, response) {
    response.send("welcome to Olivia's homepage");
});

app.use(function(request, response) {
    response.status(404).send("page not found");
});

app.listen(3000);