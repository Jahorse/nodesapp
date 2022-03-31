import { ethers } from 'ethers';

import abi from './abi/thor';
import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

class Power extends Contract {
  metadata = {
    name: 'Power',
    symbol: 'POWER',
    networkName: 'Fantom',
    decimals: 4,
    claimSupport: true,
    hasCompound: false,
    appLink: 'https://app.powernode.io/#',
    chartLink: 'https://dexscreener.com/fantom/0x8eae6aac525e6ec6a686f77e4751d3e8f96f6a83',
    swapLink: 'https://spookyswap.finance/swap?outputCurrency=0x131c7afb4e5f5c94a27611f7210dfec2215e85ae',
  };
  nodeManagerContractAddress = '0xa51b7f5071868d8bdc3619d9e5dddd5fb8c1ab90';
  tiersContractAddress = '0xf9F64b2c62210E6aCC266169da7026F209CeCd52';
  tiersContractAbi = [
    'function cashoutAll(string tierName)', // Claim
  ];

  constructor(provider, walletAddresses, contractAddress, contractName) {
    super(provider, walletAddresses, 'Fantom');
    this.contractAddress = contractAddress;
    this.contractName = contractName;
    this.metadata.name = `Power ${contractName}`;

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceCg('power-nodes');
  }

  async compoundAll() {
    console.error('PowerContract has no compoundAll().');
    return null;
  }

  async claimAllTier(tier) {
    if (!this.signer) {
      console.error('Tried calling Power.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.tiersContractAddress, this.tiersContractAbi, this.signer);
    return contract.cashoutAll(tier);
  }

  async fetchNodes() {

    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const address of this.walletAddresses) {
      try {
        const [nodeNames, lastClaims, creationTimes] = [
          (await contract._getNodesNames(address)).split('#'),
          (await contract._getNodesLastClaimTime(address)).split('#'),
          (await contract._getNodesCreationTime(address)).split('#'),
        ];

        for (const i in nodeNames) {
          const args = [ address, parseInt(creationTimes[i]) ];
          const reward = await contract._getNodeRewardAmountOf(...args);

          const node = {
            name: nodeNames[i],
            rewards: parseInt(reward) / 1e18,
            creationTime: new Date(+creationTimes[i] * 1000),
            lastProcessingTime: +lastClaims[i] ? new Date(lastClaims[i]) : 'Never',
            nextProcessingTime: Date.now(),
          };

          nodes.push(node);
        }
      } catch (e) {
        if (!e.reason.includes('NO NODE OWNER')) {
          console.log('ERR', e);
        }
      }
    }

    return nodes;
  }
}

export default Power;
