const axios = require('axios').default;
const cache = require('memory-cache-ttl');

const networkNameToIdMap = {
  "Ethereum": 1,
  "Polygon": 137,
  "Fantom": 250,
  "Avalanche": 43114,
};

cache.init({ ttl: 60, interval: 1, randomize: false });

function getCachedValue(cacheKey) {
  let cachedValue = null;

  if (cache.check(cacheKey)) {
    console.log(`Found cache key ${cacheKey}`);
    cachedValue = cache.get(cacheKey);
  }

  return cachedValue;
}

async function getPriceDg(network, hash) {
  const cacheKey = network + hash;
  const cachedValue = getCachedValue(cacheKey);
  if (cachedValue !== null) {
    return cachedValue;
  }

  const chainId = networkNameToIdMap[network];
  const dataUrl = `https://api.dev.dex.guru/v1/chain/${chainId}/tokens/${hash}/market`;
  try {
    const response = await axios.get(dataUrl, {headers: {'api-key':'WBUhTGV5Y8CRtuOL0bDikZ-Wld_FzC43F0vvjTe_TD4'}});
    console.log(response.data);
    cache.set(cacheKey, response.data);

    return response.data;
  } catch (e) {
    return e;
  }
}

module.exports = { getPriceDg };
