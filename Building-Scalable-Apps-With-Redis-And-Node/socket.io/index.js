var config = require("../config");

var expressSession = require("express-session");
var ConnectRedis = require("connect-redis")(expressSession);
var redisSession = new ConnectRedis({host: config.redisHost, port: config.redisPort});

var io = require("socket.io");
var connect = require("connect");
var cookie = require("cookie");
var cookieParser = require("cookie-parser");


var socketAuth = function socketAuth(socket, next) {
    var handshakeData = socket.request;
    var parsedCookie = cookie.parse(handshakeData.headers.cookie);
    var sid = cookieParser.signedCookie(parsedCookie["connect.sid"], config.secret);
    console.log("sid:" + sid);
    if (parsedCookie['connect.sid'] === sid) {
        return next(new Error("not authenticated"));
    }
    redisSession.get(sid, function(err, session) {
        if (session.isAuthenticated) {
            socket.user = session.user;
            socket.sid = sid;
            return next();
        } else {
            return next(new Error("not authenticated"));
        }
    });
};

var socketConnection = function socketConnection(socket) {
    socket.emit("message", {message: "hey"});
    socket.emit("message", socket.user);
};

exports.startIo = function startIo(server) {
    io = io.listen(server);
    var packtchat = io.of("/packtchat");
    packtchat.use(socketAuth);
    packtchat.on("connection", socketConnection);
    return io;
};
