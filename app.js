var express = require("express");
var expressStaticGzip = require("express-static-gzip");
var app = express();
const port = process.env.PORT || 8080;

app.use("/", expressStaticGzip("./build/"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
