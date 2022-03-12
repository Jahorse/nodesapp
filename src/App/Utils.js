export async function getPriceCg(symbol) {
  try {
    const dataUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`;
    const response = await fetch(dataUrl)
      .then(response => response.body)
      .then(rb => {
        const reader = rb.getReader();

        return new ReadableStream({
          start(controller) {
            // The following function handles each data chunk
            function push() {
              // "done" is a Boolean and value a "Uint8Array"
              reader.read().then( ({done, value}) => {
                // If there is no more data to read
                if (done) {
                  console.log('done', done);
                  controller.close();
                  return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);
                push();
              })
            }

            push();
          }
        });
      })
      .then(stream => {
        // Respond with our stream
        return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
      });
    const data = JSON.parse(response);

    return data[symbol]['usd'];
  } catch (e) {
    return e;
  }
}

export async function getPriceDs(network, hash, baseTokenSymbol = false, values = ["priceUsd"], headers = false) {
  try {
    if (!Array.isArray(values)) {
      values = [values]
    };
    values = values.flat();

    const dataUrl = `https://io10.dexscreener.io/u/trading-history/recent/${network}/${hash}`;
    const response = await fetch(dataUrl);
    const data = JSON.parse(response.getContentText());
    const tradingHistory = data.tradingHistory[0];
    const output = [];
    const keys = [];

    if (baseTokenSymbol) {
      keys.push("tokenSymbol")
      output.push(data.baseTokenSymbol);
    };

    if (values.length === 0) {
      keys.push(...Object.keys(tradingHistory))
      output.push(...Object.values(tradingHistory))
    } else {
      Object.keys(tradingHistory).forEach(key => {
        if (values.includes(key)) {
          keys.push(key)
          const value = tradingHistory[key]
          if (Number.isNaN(Number(value))) {
            output.push(value)
          } else {
            output.push(Number(value))
          }
        }
      });
    }

    if (headers){
      return [keys, output];
    }

    return [output];
  } catch (e) {
    return e;
  }
}