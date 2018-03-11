var express = require("express");
var User = require("./models/user");
var passprot = require("passport");

var router = express.Router();

router.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

router.get("/", function(req, res, next) {
    User.find()
    .sort({createAt: "descending"})
    .exec(function(err, users) {
        if (err) {
            return next(err);
        }
        res.render("index", {users: users});
    });
});

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passprot.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

router.get("/signup", function(req, res) {
    res.render("signup");
});

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

router.post("/signup", function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username}, function(err, user) {
        if (err) {
            return next(err);
        }
        if (user) {
            req.flash("error", "user already exists");
            return res.redirect("/signup");
        }
        var newUser = new User({
            username: username,
            password: password
        });
        newUser.save(next);
    });
}, passprot.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
}));

router.get("/users/:username", function(req, res, next) {
    User.findOne({ username: req.params.username }, function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(404);
        }
        res.render("profile", {user: user});
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "you must be logged id to see the page");
        res.redirect("/login");
    }
}
router.get("/edit", ensureAuthenticated, function(req, res) {
    res.render("edit");
});
router.post("/edit", ensureAuthenticated, function(req, res, next) {
    req.user.displayName = req.body.displayname;
    req.user.bio = req.body.bio;
    req.user.save(function(err) {
        next(err);
        return;
    })
    req.flash("info", "profile updated");
    res.redirect("/edit");
});

module.exports = router;

