var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');

/* GET users listing. */


router.get('/', function(req, res, next) {
  req.app.locals.db.collection("users").find().toArray()
  .then(result => {
    console.log(result);

    // Map through the array and create a new array without the "password" field
    const users = result.map(user => {
      const { password, ...users } = user;
      return users;
    })

    res.json(users);
  })
  
});


router.post("/", function(req, res) {

  const id = req.body.id;

  const objectId = new ObjectId(id);

  req.app.locals.db.collection("users").findOne({ _id: objectId })
  .then(result => {
    console.log(result);

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
  req.app.locals.db.collection("users").insertOne(req.body)
  .then(result => {
    console.log(result);

    res.send(result);
  })
})


router.get("/add", function(req, res) {

  let newUser = `
  <form action="/usersaved" method="post">
      <input type="text" name="username">användarnamn
      <input type="text" name="email">email
      <input type="password" name="password">lösenord
      <button type="submit">spara</button>
  </form>
  `
  res.send(newUser);
});

router.post("/usersaved", function(req, res) {
console.log(req.body);

let userName = req.body.username;
let userEmail = req.body.email;
let userPassword = req.body.password;

let userData = {
  username: userName,
  email: userEmail,
  password: userPassword
};


let filepath = path.join(__dirname, "users.json");
fs.readFile(filepath, "utf8", function(err, data) {
  if (err) {
      console.log(err);
  }

  let users = [];

  try {
      users = JSON.parse(data);
  } catch (parseError) {
      console.log(parseError);
  }

  users.push(userData);

  let updatedData = JSON.stringify(users, null, 2);

  fs.writeFile(filepath, updatedData, "utf8", function(writeErr) {
      if (writeErr) {
          console.log(writeErr);
      }

      let userSaved = "ditt konto har skapats";
      res.send(userSaved);
  });
});

/*

fs.appendFile("users.json", `${userName}, ${userEmail}, ${userPassword} '\n'`, function(err){
  if (err) {
      console.log(err);
  }
}) ;
*/

});


router.post("/login", function(req, res) {

  const {email, password} = req.body;

  req.app.locals.db.collection("users").findOne({email: email, password: password})
  .then(users => {

    console.log(users);
    res.send("du är inloggad");
  })

  
});


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
