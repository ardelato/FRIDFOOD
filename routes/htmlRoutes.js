var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load main page after log in and pass the id to url
  app.get("/main", function(req, res) {
    res.render("mainPage");
  });

  // Load fridge page
  app.get("/fridge/:uid", function(req, res) {
    db.Fridge.findAll({
      where: {
        //we need to INJECT USERID FROM THE FRONT END SOMEHOW
        UserId: req.params.uid
      }
    })
      .then(function(dbFridges) {
        var objArr = [];
        if (dbFridges[0] !== undefined) {
          var fridge = dbFridges[0];
          var ingredients = fridge.dataValues.ingredientName.split(",");
          for (i in ingredients) {
            if (ingredients[i] !== "") {
              var obj = {
                ingredient: ingredients[i]
              };
              objArr.push(obj);
            }
          }
        }

        res.render("myFridge", {
          msg: "Welcome!",
          fridges: objArr
        });
      })
      .catch(function(err) {
        if (err) {
          throw err;
        }
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
