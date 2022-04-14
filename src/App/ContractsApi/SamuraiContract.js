import * as ethers from 'ethers';

import abi from './abi/samurai';
import Contract from './Contract';
import { getPriceDg } from '../Utils/pricing';

class Samurai extends Contract {
  metadata = {
    name: 'Samurai',
    symbol: 'HNR',
    networkName: 'Fantom',
    decimals: 3,
    claimSupport: true,
    hasCompound: false,
    appLink: 'https://app.samurai.financial/',
    chartLink: 'https://dexscreener.com/fantom/0x663684fb5cb68004f9e844b4950ee3e0ec0e20b6',
    swapLink: 'https://spookyswap.finance/swap?outputCurrency=0x36667966c79dec0dcda0e2a41370fb58857f5182',
  };
  contractAddress = '0x36667966c79dEC0dCDA0E2a41370fb58857F5182';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Fantom');

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceDg('fantom', '0x36667966c79dec0dcda0e2a41370fb58857f5182');
  }

  async compoundAll() {
    console.error('SamuraiContract has no compoundAll().');
    return null;
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling SamuraiContract.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    return contract.cashoutAll();
  }

  async fetchNodes() {
    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      const tempSigner = this.jsonRpcProvider.getSigner(walletAddress);
      const contract = new ethers.Contract(this.contractAddress, abi, tempSigner);
      try {
        const [names, creationTimes, lastClaims, rewards, tiers] = [
          (await contract.getNodesNames()).split('#'),
          (await contract.getNodesCreationTime()).split('#'),
          (await contract.getNodesLastClaims()).split('#'),
          (await contract.getNodesRewards()).split('#'),
          (await contract.getNodesTiers()).split('#'),
        ];
        for (const i in names) {
          nodes.push({
            name: names[i],
            rewards: parseInt(rewards[i]) / 1e18,
            creationTime: new Date(parseInt(creationTimes[i]) * 1000),
            lastProcessingTime: new Date(parseInt(lastClaims[i]) * 1000),
            nextProcessingTime: Date.now(),
            tier: tiers[i],
          });
        }
      } catch (e) {
        if (!e.reason.includes('Zero node owner')) {
          console.log('ERR', e);
        }
      }
    }

    return nodes;
  }
}

export default Samurai;
