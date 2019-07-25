var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var jsonParser = express.json();
app.use(jsonParser);

//var urlencodedParser = bodyParser.urlencoded({ extended: false });
//app.use(urlencodedParser);

app.listen("3000");

app.get("/", (req, res) => {
  console.log("GET /");
  res.sendFile(__dirname+"/index.html");
});

app.get("/test", (req, res) => {
  console.log("GET /test");
  res.sendFile(__dirname+"/test.html");
});

app.post("/post", (req, res) => {
  console.log("POST /post");
  if (!req.body) return res.sendStatus(400);
  res.sendStatus(200);
});

app.post("/needFeedback", (req, res) => {
  console.log("POST /needFeedback");
  if (!req.body) return res.sendStatus(400);
  res.sendStatus(200);
  console.log(req.body.phone)
});

app.get("/stat*", (req, res) => {
  console.log("Статика из файла " +  req.url.split("Q")[1]);
  res.sendFile(__dirname + "/" + req.url.split("Q")[1]);
});
