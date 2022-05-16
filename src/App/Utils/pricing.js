import { networkNameToIdMap } from './networking';

function round(number) {
  return Math.round((number + Number.EPSILON) * 100000) / 100000;
}

async function decodeStream(stream) {
  const reader = stream.getReader();

  const readableStream = new ReadableStream({
    start(controller) {
      // The following function handles each data chunk
      function push() {
        // "done" is a Boolean and value a "Uint8Array"
        reader.read().then( ({done, value}) => {
          // If there is no more data to read
          if (done) {
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

  return new Response(readableStream, { headers: { "Content-Type": "text/html" } }).text();
}

export async function getPriceCg(symbol) {
  try {
    const dataUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`;
    const response = await fetch(dataUrl)
      .then(r => decodeStream(r.body));
    const data = JSON.parse(response);

    return round(data[symbol]['usd']);
  } catch (e) {
    console.error(e);
  }
  return;
}

export async function getPriceDg(chainName, hash) {
  try {
    const chainId = networkNameToIdMap[chainName];
    const dataUrl = `https://api.dev.dex.guru/v1/chain/${chainId}/tokens/${hash}/market`;
    const data = await fetch(dataUrl, {headers: {'api-key':'WBUhTGV5Y8CRtuOL0bDikZ-Wld_FzC43F0vvjTe_TD4'}})
      .then(async r => {
        const json = await r.json();
        return json;
      });

    return round(data.price_usd);
  } catch (e) {
    console.error(e);
  }
  return;
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
    console.error(e);
  }
  return;
}