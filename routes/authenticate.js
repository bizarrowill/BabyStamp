var db = require("../models");
var passport = require("passport");
var application = application = require('./application');

module.exports = function(app) {
    app.get('/loginpage', application.IsAuthenticated, function(req,res) {
        res.redirect("index")
    })

    app.post('/authenticate',
    passport.authenticate('local',{
    successRedirect: '/loginpage',
    failureRedirect: '/'
    })
    )

    app.get('/logout', application.destroySession)
    app.get('/signup', function(req,res) {
        res.render("signup")
    })

    app.post('/register', function(req, res){
        db.User.findOne({where: {username: req.username}}).then(function (user){
            if(!user) {
                db.User.create({
                    username: req.body.username,
                    password: req.body.password,
                    first_name: req.body.firstName,
                    last_name: req.body.lastName
                }).then(function(dbUser,err){
                    if (err) {
                        console.log(err);
                        res.redirect("/")
                    }
                });
            } else {
                console.log('user doesnt exist yet...');
                res.redirect('/signup')
            }
        })
        res.redirect('/')
    });
}