// Requiring our Event model
const db = require('../models');
var passport = require("../config/passport");
// Routes
module.exports = (app) => {
 app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
      });
    
      // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
      // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
      // otherwise send back an error
      app.post("/api/signup", function(req, res) {
        db.User.create({
          email: req.body.email,
          password: req.body.password
        })
          .then(function() {
            res.redirect(307, "/api/login");
          })
          .catch(function(err) {
            res.status(401).json(err);
          });
      });
    
      // Route for logging user out
      app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
      });
    
      // Route for getting some data about our user to be used client side
      app.get("/api/user_data", function(req, res) {
        if (!req.user) {
          // The user is not logged in, send back an empty object
          res.json({});
        } else {
          // Otherwise send back the user's email and id
          // Sending back a password, even a hashed password, isn't a good idea
          res.json({
            email: req.user.email,
            id: req.user.id
          });
        }
      });
  // GET route for getting all of the events
  app.get('/api/events',(req, res)=> {
    // findAll returns all entries for a table when used with no options
    
        db.Event.findAll({}).then((dbEvent) => res.json(dbEvent));   
    
    
  });

  // POST route for saving a new todo
  app.post('/api/events', (req, res) => {
    console.log(req.body);
    // Create takes an argument of an object describing the item we want to
    // Insert into our table. We pass in an object with a text and complete property.
    db.Event.create({
        eventName: req.body.eventName,
        hostName: req.body.hostName,
        address: req.body.address,
        city: req.body.city,
        eventDescription: req.body.eventDescription,
        indoorEvent: req.body.indoorEvent,
        outdoorEvent: req.body.outdoorEvent,
        virtualEvent: req.body.virtualEvent,
        numberofAttendees: req.body.numberofAttendees,
        dateTime: req.body.dateTime,
        status: req.body.status,
    }).then((dbEvent) => res.json(dbEvent));
  });

        // DELETE route for deleting events using the ID (req.params.id)
        app.delete('/api/events/delete/:id', (req, res) => {
            // We just have to specify which todo we want to destroy with "where"
            db.Event.destroy({
            where: {
                id: req.params.id,
            },
            }).then((dbEvent) => res.send("/eventinvite.html"));
        });

        // DELETE route for deleting events using the ID (req.params.id)
        app.get('/api/events/delete/:id', (req, res) => {
            // We just have to specify which todo we want to destroy with "where"
            db.Event.destroy({
            where: {
                id: req.params.id,
            },
            }).then((dbEvent) => res.redirect("/eventinvite.html"));
        });

         // DELETE route for deleting events using the ID (req.params.id)
         app.get('/api/events/update/:id/:statNum', (req, res) => {
            // We just have to specify which todo we want to destroy with "where"
            db.Event.update(
            {
                status: req.params.statNum
            },
            {
                where: {
                    id: req.params.id,
                },
            }
            ).then((dbEvent) => res.redirect("/eventinvite.html"));
        });




        // PUT route for updating events. We can get the updated todo data from req.body
        app.put('/api/events', (req, res) => {
            db.Event.update(
            {
                text: req.body.text,
                complete: req.body.complete,
            },
            {
                where: {
                id: req.body.id,
                },
            }
            ).then((dbEvent) => res.json(dbEvent));
        });
};
