module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;
module.exports.logout = logOut;

var util = require("../middleware/utilities");
var config = require("../config");

function index(req, res) {
    // res.send("Index");
    res.cookie("IndexCookie", "this was set from Index");
    res.render("index", {title: "Index", 
                         cookie: JSON.stringify(req.cookies),
                        session: JSON.stringify(req.session),
                        signedCookie: JSON.stringify(req.signedCookies)});
}
function login(req, res) {
    res.render("login", {title: "Login",message: req.flash("error")});
}
function loginProcess(req, res) {
    console.log(req.body);
    //res.send(req.body.username + ' ' + req.body.password);
    var isAuth = util.auth(req.body.username, req.body.password, req.session);
    if (isAuth) {
        res.redirect("/chat");
    } else {
        req.flash("error", "wrong username or password");
        res.redirect(config.routes.login);
    }
}
function chat(req, res) {
    res.send("Chat");
}
function logOut(req, res) {
    util.logOut(req.session);
    res.redirect("/");
};
