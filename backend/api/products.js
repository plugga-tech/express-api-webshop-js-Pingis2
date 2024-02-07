var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.app.locals.db.collection("products").find().toArray()
  .then(cars => {
    console.log(cars);

    res.json(cars);
  })
  
});

router.get("/:id", function(req, res) {

  const id = req.params.id;

  const objectId = new ObjectId(id);
  console.log("objectId", objectId);

  req.app.locals.db.collection("products").findOne({ _id: objectId })
  .then(result => {
    console.error("query result", result);

    res.send(result);
  })

  

  // antalet användare - kan användas för att visa antalet produkter
  /*
  req.app.locals.db.collection("users").countDocuments()
  .then(results => {
    console.log(results);
  })
  */
});

router.post("/add", function(req, res) {
  req.app.locals.db.collection("products").insertOne(req.body)
  .then(result => {
    console.log(result);

    res.json(result);
  })
})

module.exports = router;
