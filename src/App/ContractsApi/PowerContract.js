import { ethers } from 'ethers';

import abi from './abi/power';
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
  contractAddress = '0x3FEbff662DAd22a54155Bd025F2F617720F8352c';

  constructor(provider, walletAddresses, contractName, tierName) {
    super(provider, walletAddresses, 'Fantom');
    this.contractName = contractName;
    this.metadata.name = `Power ${contractName}`;
    this.tierName = tierName;

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceCg('power-nodes');
  }

  async compoundAll() {
    console.error('PowerContract has no compoundAll().');
    return null;
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling Power.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, this.contractAbi, this.signer);
    return contract.cashoutAll(this.tierName);
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const tierCount = await contract.getNodeNumberOf(walletAddress, this.tierName);

        if (tierCount > 0) {
          const names = await contract._getNodesNames(walletAddress, this.tierName);
          const creationTimes = await contract._getNodesCreationTime(walletAddress, this.tierName);
          const lastClaimTimes = await contract._getNodesLastClaimTime(walletAddress, this.tierName);
          const reward = await contract.getRewardAmountOf(walletAddress, this.tierName);
          nodes.push({
            name: `${this.contractName}: ${names.join(',')}`,
            creationTime: creationTimes.join(','),
            lastProcessingTime: lastClaimTimes.join(','),
            nextProcessingTime: Date.now(),
            rewards: parseInt(reward.toHexString(), 16) / 1e18,
          });
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
