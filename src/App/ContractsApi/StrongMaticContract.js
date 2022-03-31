import { ethers } from 'ethers';

import abi from "./abi/strong-matic.js";
import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

class StrongMatic extends Contract {
  metadata = {
    name: 'Strong MATIC',
    symbol: 'STRONG',
    networkName: 'Ethereum',
    decimals: 2,
    claimSupport: false,
    hasCompound: false,
    appLink: 'https://app.strongblock.com/',
    chartLink: 'https://dexscreener.com/ethereum/0xc0bf97bffa94a50502265c579a3b7086d081664b',
    swapLink: 'https://app.uniswap.org/#/swap?outputCurrency=0x990f341946a3fdb507ae7e52d17851b87168017c&chain=mainnet',
  };
  contractAddress = '0xC5622f143972A5Da6aaBC5F5379311eE5EB48568';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Ethereum');

    this.initNodes();
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
    console.error('StrongMatic.claimcompoundAll() is not implemented.');
    return null;
  }

  async claimAll() {
    console.error('StrongMatic.claimAll() is not implemented.');
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
          const reward = await contract.getNodeReward(walletAddress, i);
          rewards += parseInt(reward.toHexString(), 16)  / 1e18;
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

export default StrongMatic;