const express = require("express");
const expressStaticGzip = require("express-static-gzip");
const priceUtil = require("./price");
const app = express();
const port = process.env.PORT || 8080;


app.get('/price', async (req, res) => {
  const price = await priceUtil.getPriceDg(req.query.chainId, req.query.tokenAddress);

  const priceJson = JSON.stringify(price);
  res.json(priceJson);
});

app.use("/", expressStaticGzip("./build/"));


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
