const axios = require('axios').default;

const networkNameToIdMap = {
  "Ethereum": 1,
  "Polygon": 137,
  "Fantom": 250,
  "Avalanche": 43114,
};

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

async function getPriceDg(network, hash) {
  const chainId = networkNameToIdMap[network];
  const dataUrl = `https://api.dev.dex.guru/v1/chain/${chainId}/tokens/${hash}/market`;
  try {
    const response = await axios.get(dataUrl, {headers: {'api-key':'WBUhTGV5Y8CRtuOL0bDikZ-Wld_FzC43F0vvjTe_TD4'}});

    return response.data;
  } catch (e) {
    return e;
  }
}

module.exports = { getPriceDg };
