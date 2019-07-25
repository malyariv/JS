const express = require("express");
const bodyParser = require('body-parser');

var app = express();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.get("/currency", (req, res)=> {res.sendFile(__dirname+"/currency.json")});

app.post('/login', urlencodedParser, function (req, res) {
    res.send('welcome, ' + req.body.username)
  })
   
  // POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
    // create user in req.body
})
