import { ethers } from 'ethers';
import Contract from './Contract';

import abi from "./abi/strong-eth.js";
import { getPriceCg } from '../Utils/Pricing';

class StrongEthContract extends Contract {
  metadata = {
    name: 'Strong ETH',
    symbol: 'STRONG',
    networkName: 'Ethereum',
    decimals: 2,
    claimSupport: false,
    hasCompound: false,
    appLink: 'https://app.strongblock.com/',
    chartLink: 'https://dexscreener.com/ethereum/0xc0bf97bffa94a50502265c579a3b7086d081664b',
    swapLink: 'https://app.uniswap.org/#/swap?outputCurrency=0x990f341946a3fdb507ae7e52d17851b87168017c&chain=mainnet',
  };
  contractAddress = '0xFbdDaDD80fe7bda00B901FbAf73803F2238Ae655';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Ethereum');

    this.fetchPromise = this.fetchNodes().then(n => this.nodes = n);
  }

  async getPriceUsd() {
    return await getPriceCg('strong');
  }

  getTotalRewards(nodes, compounding) {
    let rewards = 0;
    for (const node of nodes) {
        rewards += parseFloat(node.rewards);
    }
    return rewards;
  }

  async compoundAll() {
    console.error('StrongEth.claimcompoundAll() is not implemented.');
    return null;
  }

  async claimAll() {
    console.error('StrongEth.claimAll() is not implemented.');
    return null;
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const count = await contract.entityNodeCount(walletAddress);

        if (count < 1) {
          continue;
        }

        let rewards = 0;
        for (let i=1; i<=count; i++) {
          const reward = await contract.getReward(walletAddress, i);
          rewards += parseInt(reward.toHexString(), 16) / 1e18;
        }

        nodes.push({
          name: `${walletAddress.substring(0,8)}`,
          rewards: rewards,
        });

      } catch (e) {
        console.log('ERR', e);
      }
    }

    return nodes;
  }
}

export default StrongEthContract;