var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {

  
});

router.post("/add", function(req, res) {

  console.log(req.body);

  let user = req.body.username.email.password;
})

module.exports = router;
