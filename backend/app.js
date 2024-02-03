var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require("fs");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

var app = express();

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://127.0.0.1:27017", {
    useUnifiedTopology: true
})
.then(client => {
    console.log("bajs");

    const db = client.db("anton-schyberg");
    app.locals.db = db;
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.get("/users", function(req, res) {

    let newUser = `
    <form action="/usersaved" method="post">
        <input type="text" name="username">
        <input type="text" name="email">
        <input type="text" name="password">
        <button type="submit">spara</button>
    </form>
    `
    res.send(newUser);
})

app.post("/usersaved", function(req, res) {
    console.log(req.body);

    let userName = req.body.username;
    let userEmail = req.body.email;
    let userPassword = req.body.password;

    let user = `${userName}, ${userEmail}, ${userPassword}`;
    console.log(user);
    let userSaved = "ditt konto har skapats";

    fs.appendFile("users.txt", `${userName}, ${userEmail}, ${userPassword} '\n'`, function(err){
        if (err) {
            console.log(err);
        }
    }) ;

    res.send(userSaved);
})

module.exports = app;
