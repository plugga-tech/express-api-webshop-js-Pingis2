var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require("fs");

var indexRouter = require('./api/index');
var usersRouter = require('./api/users');
var productsRouter = require('./api/products');
var ordersRouter = require('./api/orders');
const { log } = require('console');

var app = express();

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://127.0.0.1:27017/anton-schyberg", {
    useUnifiedTopology: true
})
.then(client => {
    console.log("databas kopplad");

    const db = client.db("anton-schyberg");
    app.locals.db = db;
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/index', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);



module.exports = app;
