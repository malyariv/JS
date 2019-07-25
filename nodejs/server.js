var express = require("express");
var bodyParser = require('body-parser');

var app = express();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.get("/currency", (req, res) => {
  console.log("GET /currency");
  res.sendFile(__dirname+"/currency.json");
});

app.get("/", (req, res) => {
  console.log("GET /");
  res.sendFile(__dirname+"/index.html");
});

app.get("/js", (req, res) => {
  console.log("GET /js");
  res.sendFile(__dirname+"/currency.js");
});
app.get("/stat*", (req, res) => {
  console.log("Статика из файла" +  req.url.split("/")[2]);
  res.sendFile(__dirname + "/" + req.url.split("/")[2]);
});
app.listen("3000");
/*app.post('/login', urlencodedParser, function (req, res) {
    res.send('welcome, ' + req.body.username)
  })
   
  // POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
    // create user in req.body
})*/
