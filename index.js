// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

let responseObj = {};
app.get("/api/:input", (request, response) => {
  let input = request.params.input;
  let date = new Date(input);

  if (!isNaN(date)) {
    responseObj["utc"] = date.toUTCString();
    responseObj["unix"] = date.getTime();
  } else {
    let converted = parseInt(input);
    responseObj["unix"] = new Date(converted).getTime();
    responseObj["utc"] = new Date(converted).toUTCString();
  }

  if (!responseObj["unix"] || !responseObj["utc"]) {
    responseObj = { error: "Invalid Date" };
  }
  response.json(responseObj);
});

app.get("/api", (request, response) => {
  responseObj["utc"] = new Date().toUTCString();
  responseObj["unix"] = new Date().getTime();
  response.json(responseObj);
});
