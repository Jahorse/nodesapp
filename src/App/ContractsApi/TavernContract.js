import * as ethers from 'ethers';

import abi from './abi/tavern-brewery';
import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

class Tavern extends Contract {
  metadata = {
    name: 'Tavern',
    symbol: 'MEAD',
    networkName: 'Avalanche',
    decimals: 4,
    claimSupport: true,
    hasCompound: false,
    appLink: 'https://dapp.tavern.money/',
    chartLink: 'https://dexscreener.com/avalanche/0x295f322e3cf883925ae8cc9346e4d2b19d7dcb0c',
    swapLink: 'https://traderjoexyz.com/trade?inputCurrency=0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E&outputCurrency=0xD21CdCA47Fa45A0A51eec030E27AF390ab3aa489#/',
  };
  contractAddress = '0xf5E723f0FD54f8c75f0Da8A8F9D68Bf67B20b850';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Avalanche');

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceCg('mead');
  }

  async compoundAll() {
    console.error('TavernContract has no compoundAll().');
    return null;
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling TavernContract.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    return contract.claimAll();
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const count = await contract.balanceOf(walletAddress);

        for (let i=0; i<count; i++) {
          const nodeId = await contract.tokenOfOwnerByIndex(walletAddress, i);
          const rewards = await contract.pendingMead(nodeId);
          const stats = await contract.breweryStats(nodeId);

          nodes.push({
            rewards: parseInt(rewards.toString()) / 1e18,
            tier: parseInt(stats.tier.toString()) + 1,
            lastProcessingTime: new Date(parseInt(stats.lastTimeClaimed.toString()) * 1000),
            nextProcessingTime: Date.now(),
          })
        }
      } catch (e) {
        console.log('ERR', e);
      }
    }

    return nodes;
  }
}

export default Tavern;
