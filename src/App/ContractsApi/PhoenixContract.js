import * as ethers from 'ethers';

import abi from './abi/phoenix';
import Contract from './Contract';
import { getPriceDg } from '../Utils/pricing';

class Phoenix extends Contract {
  metadata = {
    name: 'Phoenix',
    symbol: 'FIRE',
    networkName: 'Avalanche',
    decimals: 3,
    claimSupport: true,
    hasCompound: false,
    appLink: 'https://thephoenix.finance/app/',
    chartLink: 'https://dexscreener.com/avalanche/0xc71fa9d143ad905ee73b6edb4cd44df427df1fe7',
    swapLink: 'https://traderjoexyz.com/trade?outputCurrency=0xfcc6ce74f4cd7edef0c5429bb99d38a3608043a5#/',
  };
  contractAddress = '0xbAd32DeaD95Eb55Ae849c6309ecA1b3d1b03bf69';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Avalanche');

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceDg('Avalanche', '0xfcc6ce74f4cd7edef0c5429bb99d38a3608043a5');
  }

  async compoundAll() {
    console.error('Phoenix.compoundAll() is not implemented.');
    return;
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling Phoenix.claimAll() without a valid signer.');
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
        const rewards = await contract.getRewardAmount(walletAddress);

        for (const i in rewards.nodeRewards) {
          const reward = parseInt(rewards.nodeRewards[i].toHexString(), 16);
          const isMaster = rewards.curMasterNFTEnable[i];
          const isGrand = rewards.curGrandNFTEnable[i];
          let name = 'Nest';
          if (isGrand) { name = 'GrandMasterNest'; }
          else if (isMaster) { name = 'MasterNest'; }

          nodes.push({
            name,
            rewards: reward / 1e18,
            nextProcessingTime: Date.now(),
          });
        }
      } catch (e) {
        console.log('ERR', e);
      }
    }

    return nodes;
  }
}

export default Phoenix;
