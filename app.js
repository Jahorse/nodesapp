const express = require("express");
const expressStaticGzip = require("express-static-gzip");
const app = express();
const port = process.env.PORT || 8080;

app.use("/", expressStaticGzip("./build/"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
