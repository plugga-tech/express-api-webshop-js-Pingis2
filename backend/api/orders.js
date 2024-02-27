var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add', function(req, res, next) {
  req.app.locals.db.collection("orders").insertOne(req.body)
  .then(result => {
    console.log(result);

    res.json(result);
  })
});

router.get("/all", function(req, res) {
  req.app.locals.db.collection("orders").find().toArray()
  .then(orders => {

    res.send(orders);
  })
})

module.exports = router;