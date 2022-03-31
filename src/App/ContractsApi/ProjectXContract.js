import * as ethers from 'ethers';

import abi from './abi/project-x';
import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

class ProjectX extends Contract {
  metadata = {
    name: 'Project X',
    symbol: 'PXT2',
    networkName: 'Avalanche',
    decimals: 3,
    claimSupport: true,
    hasCompound: false,
    appLink: 'https://projectx.financial/#nodes',
    chartLink: 'https://dexscreener.com/avalanche/0x326238cfaf10fc6f536791b548441d03b80daca8',
    swapLink: 'https://traderjoexyz.com/trade?outputCurrency=0x9e20af05ab5fed467dfdd5bb5752f7d5410c832e#/',
  };
  contractAddress = '0x05c88F67fa0711b3a76ada2B6f0A2D3a54Fc775c';
  claimContractAddress = '0x9e20Af05AB5FED467dFDd5bb5752F7d5410C832e';
  claimContractAbi = [
    'function cashoutAll()',
  ];

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
    const contract = new ethers.Contract(this.claimContractAddress, this.claimContractAbi, this.signer);
    return contract.cashoutAll();
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const creationTimes = (await contract._getNodesCreationTime(walletAddress)).split('#');

        for (const i in creationTimes) {
          const nodeInfo = await contract.getNodeInfo(walletAddress, creationTimes[i]);
          const reward = await contract._getRewardAmountOf(walletAddress, creationTimes[i]);
          const creationTime = new Date(parseInt(nodeInfo.creationTime.toHexString(), 16) * 1000);
          const nextProcessingTime = new Date(creationTime.getTime());
          nextProcessingTime.setHours(nextProcessingTime.getHours() + 1);

          nodes.push({
            name: parseInt(nodeInfo.nodeId.toHexString(), 16),
            rewards: parseInt(reward.toHexString(), 16) / 1e18,
            creationTime,
            lastProcessingTime: new Date(parseInt(nodeInfo.lastClaimTime.toHexString(), 16) * 1000),
            nextProcessingTime,
          });
        }
      } catch (e) {
        if (!e.reason.includes('NO NODE OWNER')) {
          console.log('ERR', e);
        }
      }
    }

    return nodes;
  }
}

export default ProjectX;
