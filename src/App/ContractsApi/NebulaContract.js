import * as ethers from 'ethers';

import { claimAbi, managerAbi } from './abi/nebula';
import Contract from './Contract';
import { getPriceDg } from '../Utils/pricing';

class Nebula extends Contract {
  metadata = {
    name: 'Nebula',
    symbol: 'NeBu',
    networkName: 'Avalanche',
    decimals: 3,
    claimSupport: true,
    hasCompound: true,
    appLink: 'https://app.nebulanodes.finance/',
    chartLink: 'https://dexscreener.com/avalanche/0xd177B5D5c73Cb385732b658824F2c6614eB6eD4f',
    swapLink: 'https://traderjoexyz.com/trade?outputCurrency=0x5aa2ff4ab706307d8b3d90a462c1ddc055655734#/',
  };
  contractAddress = '0x7Fb35013090590B8FFb628a89851FaC6e6f0EBC9';
  claimAddress = '0x5AA2Ff4Ab706307d8B3D90A462c1ddC055655734';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Avalanche');

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceDg('Avalanche', '0x5aa2ff4ab706307d8b3d90a462c1ddc055655734');
  }

  async compoundAll() {
    if (this.walletAddresses.length > 1) {
      console.error('Cannot claim multiple addresses at once.');
      return;
    }
    if (!this.signer) {
      console.error('Tried calling Nebula.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.claimAddress, claimAbi, this.signer);
    const createTimeEpoch = this.nodes[0].creationTime.getTime() / 1000;
    return contract.compoundAllNodes(createTimeEpoch);
  }

  async claimAll() {
    if (this.walletAddresses.length > 1) {
      console.error('Cannot claim multiple addresses at once.');
      return;
    }
    if (!this.signer) {
      console.error('Tried calling Nebula.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.claimAddress, claimAbi, this.signer);
    return contract.cashoutAll();
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, managerAbi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const nodesRaw = await contract.getAllNodes(walletAddress);

        for (const nodeRaw of nodesRaw) {
          const name = nodeRaw.name;
          const creationTime = parseInt(nodeRaw.creationTime);
          const lastClaimTime = parseInt(nodeRaw.lastClaimTime);
          const rewards = await contract.getNodeReward(walletAddress, creationTime);

          nodes.push({
            name,
            rewards: parseInt(rewards.toHexString(), 16) / 1e18,
            creationTime: new Date(creationTime * 1000),
            lastProcessingTime: new Date(lastClaimTime * 1000),
            nextProcessingTime: Date.now(),
          });
        }
      } catch (e) {
        if (!e.reason.includes('NOT_OWNER')) {
          console.log('ERR', e);
        }
      }
    }

    return nodes;
  }
}

export default Nebula;
