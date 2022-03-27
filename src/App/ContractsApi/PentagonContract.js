import * as ethers from 'ethers';
import { emitCustomEvent } from 'react-custom-events';

import {
  claimAbi,
  nodeQueryAbi,
} from './abi/pentagon';
import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

class Pentagon extends Contract {
  metadata = {
    name: 'Pentagon',
    symbol: 'PENT',
    networkName: 'Polygon',
    decimals: 4,
    claimSupport: true,
    hasCompound: false,
    appLink: 'https://app.pentagon.financial/node',
    chartLink: 'https://dexscreener.com/polygon/0x01b758b406fb0f4e36c95dfbc909763d7080e5b4',
    swapLink: 'https://quickswap.exchange/#/swap?outputCurrency=0x283366bb42ef49a994913baf22263c6562e588a4',
  };
  nodeQueryContractAddress = '0x1aEa18307D5063d9c4533Ac3093352B1DffeE2Fd';
  claimContractAddress = '0xF75BC031f362e55967Cf278586bBeB0954442D84';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Polygon');

    this.fetchPromise = this.fetchNodes().then(n => this.nodes = n);
  }

  async getPriceUsd() {
    return await getPriceCg('pentagon-finance');
  }

  getTotalRewards(nodes, compounding) {
    let rewards = 0;
    for (const node of nodes) {
        rewards += parseFloat(node['rewards']);
    }

    return rewards;
  }

  async compoundAll() {
    console.error('PentagonContract has no compoundAll().');
    return null;
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling PentagonContract.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.claimContractAddress, claimAbi, this.signer);
    return contract.cashoutAll();
  }

  async fetchNodes() {

    const contract = new ethers.Contract(this.nodeQueryContractAddress, nodeQueryAbi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const [nodeTypes, nodeNames, lastClaims, creationTimes, rewards] = [
          (await contract._getNodesType(walletAddress)).split('#'),
          (await contract._getNodesName(walletAddress)).split('#'),
          (await contract._getNodesLastClaimTime(walletAddress)).split('#'),
          (await contract._getNodesCreationTime(walletAddress)).split('#'),
          (await contract._getNodesRewardAvailable(walletAddress)).split('#'),
        ]

        for (const i in nodeNames) {

          const node = {
            name: nodeNames[i],
            rewards: parseInt(rewards[i]) / 1e18,
            creationTime: new Date(parseInt(creationTimes[i]) * 1000),
            lastProcessingTime: lastClaims[i] ? new Date(parseInt(lastClaims[i]) * 1000) : 'Never',
            nextProcessingTime: Date.now(),
            type: nodeTypes[i],
          };

          nodes.push(node);
        }
      } catch (e) {
        if (!e.reason.includes('NO NODE OWNER')) {
          console.log('ERR', e);
        }
      }
    }

    if (nodes.length > 0) {
      emitCustomEvent('polygon-node', undefined);
    }
    return nodes;
  }
}

export default Pentagon;
