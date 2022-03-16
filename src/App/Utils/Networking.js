export const networkIdToNameMap = {
  1: "Ethereum",
  137: "Polygon",
  250: "Fantom",
  43114: "Avalanche",
};

export const networkNameToIdMap = {
  "Ethereum": 1,
  "Polygon": 137,
  "Fantom": 250,
  "Avalanche": 43114,
};

export function setNetwork(provider, networkName) {
  const networkId = `0x${(networkNameToIdMap[networkName]).toString(16)}`;
  provider.send('wallet_switchEthereumChain', [{ chainId: networkId }]);
}
