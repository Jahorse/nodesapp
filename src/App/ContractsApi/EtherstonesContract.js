import * as ethers from 'ethers';

import abi from './abi/etherstones';
import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

class Etherstones extends Contract {
  metadata = {
    name: 'Etherstones',
    symbol: 'ETHS',
    networkName: 'Avalanche',
    decimals: 2,
    claimSupport: true,
    hasCompound: true,
    appLink: 'https://etherstones.fi/dashboard',
    chartLink: 'https://dexscreener.com/avalanche/0x78871b497613dc9b9886167e75e6ffd57d351046',
    swapLink: 'https://traderjoexyz.com/trade?outputCurrency=0x1efe6a8af01920912f0b4f7f26fc16e294664c4c#/',
  };
  contractAddress = '0x4cE3dc6aFe5AC7cFe53f29837337331F99EE6010';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Avalanche');

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceCg('etherstones');
  }

  async compoundAll() {
    if (!this.signer) {
      console.error('Tried calling EtherstonesContract.compoundAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    return contract.claimAllAvailableEtherstoneReward();
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling EtherstonesContract.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    return contract.compoundAllAvailableEtherstoneReward();
  }

  async fetchNodes() {

    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const nodesRaw = await contract.getOwnedNodes(walletAddress);

        for (const nodeRaw of nodesRaw) {
          const reward = await contract.calculateRewards(nodeRaw.id);
          nodes.push({
            id: parseInt(nodeRaw.id.toHexString(), 16),
            name: nodeRaw.name,
            rewards: parseInt(reward.toHexString(), 16) / 1e18,
            lastProcessingTime: new Date(parseInt(nodeRaw.lastInteract.toHexString(), 16)),
            nextProcessingTime: Date.now(),
            lockedEths: parseInt(nodeRaw.lockedETHS.toHexString(), 16) / 1e18,
            type: parseInt(nodeRaw.nodeType.toHexString(), 16),
            tier: parseInt(nodeRaw.tier.toHexString(), 16),
            timesCompounded: parseInt(nodeRaw.timesCompounded.toHexString(), 16),
            owner: nodeRaw.owner,
          });
        }
      } catch (e) {
        if (!e.reason.includes('No nodes')) {
          console.log('ERR', e);
        }
      }
    }

    return nodes;
  }
}

export default Etherstones;
