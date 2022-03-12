export async function getPriceCg(symbol) {
  try {
    const dataUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}a&vs_currencies=usd`;
    const response = await fetch(dataUrl);
    const data = JSON.parse(response.getContentText());

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