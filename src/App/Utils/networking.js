export const networkIdToNameMap = {
  1: "Ethereum",
  25: "Cronos",
  137: "Polygon",
  250: "Fantom",
  43114: "Avalanche",
};

export const networkNameToIdMap = {
  "Avalanche": 43114,
  "Cronos": 25,
  "Ethereum": 1,
  "Fantom": 250,
  "Polygon": 137,
};

export function setNetwork(provider, networkName) {
  const networkId = `0x${(networkNameToIdMap[networkName]).toString(16)}`;
  provider.send('wallet_switchEthereumChain', [{ chainId: networkId }]);
}
