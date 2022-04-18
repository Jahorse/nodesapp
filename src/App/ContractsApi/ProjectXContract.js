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
    hasCompound: false,
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
    console.error('ProjectX.compoundAll() is not implemented.');
    return;
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling ProjectX.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, this.claimContractAbi, this.signer);
    return contract.claim();
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const nodesRaw = await contract.nodes(walletAddress);
        const tier = await contract.getTierByName('basic');

        for (const node of nodesRaw) {
          const claimeableAmount = (((new Date().getTime() / 1000 -
            parseInt(node.claimedTime)) *
            (parseInt(node.tierIndex) === 0
              ? tier.rewardsPerTime
              : 0.8))
            / tier.claimInterval) + parseInt(node.leftover);

          nodes.push({
            id: node.id,
            name: node.id,
            rewards: parseInt(claimeableAmount.toString()) / 1e18,
            creationTime: new Date(node.createdTime * 1000),
            lastProcessingTime: new Date(node.claimedTime * 1000),
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

export default ProjectX;
