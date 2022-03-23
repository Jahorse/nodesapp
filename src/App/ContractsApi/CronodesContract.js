import * as ethers from 'ethers';

import abi from './abi/cronodes';
import Contract from './Contract';
import { getPriceCg } from '../Utils/Pricing';

class CronodesContract extends Contract {
  metadata = {
    name: 'Cronodes',
    symbol: 'CRN',
    networkName: 'Cronos',
    decimals: 4,
    claimSupport: true,
    hasCompound: false,
    appLink: 'https://cronodes.app/',
    chartLink: 'https://dexscreener.com/cronos/0x3ca50d07b1cfb4a4e61ee8d00c2ef1af6e42cee8',
    swapLink: 'https://app.cronaswap.org/swap?outputCurrency=0x8174bac1453c3ac7caed909c20ceadeb5e1cda00',
  };
  contractAddress = '0x7f0CCde008102a2Db79c3372A10E21c07451dB38';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Cronos');

    this.fetchPromise = this.fetchNodes().then(n => this.nodes = n);
  }

  async getPriceUsd() {
    return await getPriceCg('cronodes');
  }

  getTotalRewards(nodes, compounding) {
    let rewards = 0;
    for (const node of nodes) {
        rewards += parseFloat(node['rewards']);
    }

    return rewards;
  }

  async compoundAll() {
    console.error('CronodesContract has no compoundAll().');
    return null;
  }

  async claimAll() {
    if (this.walletAddresses.length > 1) {
      console.error('Cannot claim multiple addresses at once.');
      return;
    }
    if (!this.signer) {
      console.error('Tried calling AtlasContract.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    return contract._cashoutAllNodesReward(this.walletAddresses[0]);
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const [nodeNames, creationTimes, lastClaimTimes] = [
          (await contract._getNodesNames(walletAddress)).split('#'),
          (await contract._getNodesCreationTime(walletAddress)).split('#'),
          (await contract._getNodesLastClaimTime(walletAddress)).split('#'),
        ];

        for (const i in nodeNames) {
          const reward = await contract._getRewardAmountOf(walletAddress, creationTimes[i]);

          const node = {
            name: nodeNames[i],
            rewards: parseInt(reward.toHexString(), 16) / 1e18,
            creationTime: new Date(creationTimes[i] * 1000),
            lastProcessingTime: new Date(lastClaimTimes[i] * 1000),
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

export default CronodesContract;
