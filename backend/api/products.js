var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.app.locals.db.collection("products").find().toArray()
  .then(products => {

    ourCars = `
    <h1>Våra bilar</h1>
    <ul>
    `

    products.forEach(products => {
      ourCars += `<li>${products.name + " | pris: " + products.price + " | antal: " + products.stock}</li>`;
    });

    ourCars += `
      </ul>
    `

    res.send(ourCars);
  });
  
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
});

router.post("/add", function(req, res) {
  req.app.locals.db.collection("products").insertOne(req.body)
  .then(result => {
    console.log(result);



    res.json(result);
  })
})

module.exports = router;
