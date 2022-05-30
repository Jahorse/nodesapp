import * as ethers from 'ethers';

import abi from './abi/polar';
import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

class Polar extends Contract {
  metadata = {
    name: 'Polar',
    symbol: 'POLAR',
    networkName: 'Avalanche',
    decimals: 4,
    claimSupport: true,
    hasCompound: false,
    appLink: 'https://app.polar.financial/',
    chartLink: 'https://dexscreener.com/avalanche/0x6c1c0319d8ddcb0ffe1a68c5b3829fd361587db4',
    swapLink: 'https://traderjoexyz.com/trade?outputCurrency=0x6c1c0319d8ddcb0ffe1a68c5b3829fd361587db4#/',
  };
  contractAddress = '0xEa8129f602E0CFDD9FBa116e07fb04A13AFdc48a';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Avalanche');

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceCg('polar');
  }

  async compoundAll() {
    if (!this.signer) {
      console.error('Tried calling Polar.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    return contract.compound('basic', 1);
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling Polar.claimAll() without a valid signer.');
      return null;
    }
    if (this.walletAddresses.length > 1) {
      console.error('Cannot claim multiple addresses at once.');
      return;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    return contract.claimRewardsAll('0x6c1c0319d8ddcb0ffe1a68c5b3829fd361587db4', this.walletAddresses[0]);
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const [rewards, fees] = await contract.getClaimableRewardsOf(walletAddress);

        nodes.push({
          rewards: (parseInt(rewards.toHexString(), 16) / 1e18),
          fees: (parseInt(fees.toHexString(), 16) / 1e18),
        });
      } catch (e) {
        console.log('ERR', e);
      }
    }

    return nodes;
  }
}

export default Polar;
