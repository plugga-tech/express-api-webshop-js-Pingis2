var express = require('express');
var router = express.Router();

/* GET users listing. */

/*
router.get('/users', function(req, res, next) {

  
});
*/


/*
router.post("/api/users", function(req, res) {

  req.router.locals.db.collection("users").find().toArray()
  
  .then(results => {

    let printUsers = "<div><h2>Våra users</h2>"

    //for (user in results) {
      //printUsers += "<div>" + results[user].name + " | " + results[car].model + " | " + results[car].year + " | " + results[car].licensePlate + "</div>";
    //}

    printUsers += "</div>"

    res.send(printUsers)
    
  })

  req.router.locals.db.collection("users").countDocuments()
  .then(results => {
    console.log(results);
  })

});

router.post("/add", function(req, res) {
  req.app.locals.db.collection("cars").insertMany(req.body)
    .then(result => {
      console.log(result);
      res.json({"status": "ok"});
    })
});
*/


module.exports = router;
