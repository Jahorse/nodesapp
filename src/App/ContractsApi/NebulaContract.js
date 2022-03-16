import * as ethers from 'ethers';

import abi from './abi/nebula';
import Contract from './Contract';
import { getPriceDg } from '../Utils/Pricing';

class NebulaContract extends Contract {
  metadata = {
    name: 'Nebula',
    symbol: 'NeBu',
    networkName: 'Avalanche',
    decimals: 3,
    hasClaim: true,
    hasCompound: false,
    chartLink: 'https://dexscreener.com/avalanche/0x36c1d7d2eb0cf928ab05dfe8c339f5b5c7c818a4',
    swapLink: 'https://traderjoexyz.com/trade?outputCurrency=0x1aea17a08ede10d158baac969f809e6747cb2b22#/',
  };
  contractAddress = '0xd311d77c8F4665bdA9e684Cd08f8991f364AbEF5';
  claimContractAddress = '0x1aEa17a08EdE10D158baac969f809E6747cb2B22';
  claimContractAbi = [
    'function cashoutAll()',
  ];

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Avalanche');

    this.fetchPromise = this.fetchNodes().then(n => this.nodes = n);
  }

  async getPriceUsd() {
    return await getPriceDg('Avalanche', '0x1aea17a08ede10d158baac969f809e6747cb2b22');
  }

  getTotalRewards(nodes, compounding) {
    let rewards = 0;
    for (const node of nodes) {
        rewards += parseFloat(node['rewards']);
    }

    return rewards;
  }

  async compoundAll() {
    console.error('Nebula.compoundAll() is not implemented.');
    return;
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling Nebula.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.claimContractAddress, this.claimContractAbi, this.signer);
    return contract.cashoutAll();
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const [nodeNames, lastClaims, creationTimes] = [
          (await contract.getNodesNames(walletAddress)).split('#'),
          (await contract.getNodesLastClaimTime(walletAddress)).split('#'),
          (await contract.getNodesCreationTime(walletAddress)).split('#'),
        ];

        for (const i in nodeNames) {
          const rewards = await contract.getNodeReward(walletAddress, creationTimes[i]);

          const node = {
            name: nodeNames[i],
            rewards: parseInt(rewards.toHexString(), 16) / 1e18,
            creationTime: new Date(parseInt(creationTimes[i]) * 1000),
            lastProcessingTime: lastClaims[i] ? new Date(parseInt(lastClaims[i]) * 1000) : 'Never',
            nextProcessingTime: Date.now(),
          };

          nodes.push(node);
        }
      } catch (e) {
        console.log('ERR', e);
      }
    }

    return nodes;
  }
}

export default NebulaContract;
