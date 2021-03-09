// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/landingpage.html"));
  });
  // app.get("/events", isAuthenticated, function(req, res) {
  //   //res.render('index', {layout : 'main'})
  //   db.Event.findAll().then((response) =>{
  //     res.render('index', response)
  //   });
  //  // res.sendFile(path.join(__dirname, "../views/index.hbs"));
  // });

  app.get("/createevent", isAuthenticated, function (req, res){ 
      res.sendFile(path.join(__dirname, "../public/createvent.html"))
  })
  app.get("/findevents",isAuthenticated, function (req, res){
    res.sendFile(path.join(__dirname, "../public/sample.html"))
  })
  app.get("/aboutus", isAuthenticated, function (req, res){
    res.sendFile(path.join(__dirname, "../public/aboutus.html"))
  })
  app.get("/eventsinvite", isAuthenticated, function (req, res){
    res.sendFile(path.join(__dirname, "../public/eventinvite.html"))
  })

};
