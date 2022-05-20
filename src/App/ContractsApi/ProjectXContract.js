import * as ethers from 'ethers';

import abi from './abi/project-x';
import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

class ProjectX extends Contract {
  metadata = {
    name: 'Project X',
    symbol: 'PXT',
    networkName: 'Avalanche',
    decimals: 3,
    claimSupport: true,
    hasCompound: true,
    appLink: 'https://projectx.financial/#nodes',
    chartLink: 'https://dexscreener.com/avalanche/0x9ADCbba4b79eE5285E891512b44706F41F14CAFd',
    swapLink: 'https://traderjoexyz.com/trade?outputCurrency=0x9adcbba4b79ee5285e891512b44706f41f14cafd#/',
  };
  contractAddress = '0x89a48f08963BE9DDEEf49796C6f2cae7AD54752f';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Avalanche');

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceCg('project-x-nodes');
  }

  async compoundAll() {
    if (!this.signer) {
      console.error('Tried calling ProjectX.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    return contract.compound('basic', 1);
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling ProjectX.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    return contract.claim();
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const rawNodes = await contract.nodes(walletAddress);
        const reward = await contract.claimable(walletAddress);

        const ids = [];
        let creationTime = 0;
        let lastClaim = 0;
        let feesDue = Number.MAX_SAFE_INTEGER;
        let leftovers = 0;
        for (const rawNode of rawNodes) {
          ids.push(rawNode.id);
          if (rawNode.createdTime > creationTime) {
            creationTime = rawNode.createdTime;
          }
          if (rawNode.claimedTime > lastClaim) {
            lastClaim = rawNode.claimedTime;
          }
          if (rawNode.limitedTime < feesDue) {
            feesDue = rawNode.limitedTime;
          }
          leftovers += parseInt(rawNode.leftover.toHexString(), 16) / 1e18;
        }
        nodes.push({
          name: ids.join(','),
          rewards: (parseInt(reward.toHexString(), 16) / 1e18) + leftovers,
          creationTime: new Date(creationTime * 1000),
          lastProcessingTime: new Date(lastClaim * 1000),
          nextProcessingTime: Date.now(),
          feesDue: new Date(feesDue * 1000),
        });
      } catch (e) {
        console.log('ERR', e);
      }
    }

    return nodes;
  }
}

export default ProjectX;
