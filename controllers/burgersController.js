var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  db.Burger.findAll({})
  .then(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  console.log(req.body.name);
  db.Burger.create({
    name: req.body.name,
    devoured: false
    }) .then (function(dbPost) {
      res.json(dbPost);
    });
});


// router.put("/api/burger/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   burger.update({
//     eaten: req.body.eaten
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

router.put("/api/burger/:id", function(req, res) {
  db.Burger.update({
    devoured: true
  },
    {
      where: {
        id: req.params.id
      }
    })
    .then(function(dbUpdate) {
      res.json(dbUpdate);
    });
});


// Export routes for server.js to use.
module.exports = router;
