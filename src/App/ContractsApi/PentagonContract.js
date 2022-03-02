import * as ethers from 'ethers';

import {
  claimAbi,
  nodeQueryAbi,
} from './abi/pentagon';
import Contract from './Contract';


class PentagonContract extends Contract {
  nodeQueryContractAddress = '0x1aEa18307D5063d9c4533Ac3093352B1DffeE2Fd';
  claimContractAddress = '0xF75BC031f362e55967Cf278586bBeB0954442D84';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Polygon');

    this.fetchPromise = this.fetchNodes().then(n => this.nodes = n);
  }

  hasCompound() { return false; }

  getName() { return `Pentagon`; }

  getToken() { return 'PENT'; }

  showDecimalPlaces() { return 4; }

  getTotalRewards(nodes, compounding) {
    let rewards = 0;
    for (const node of nodes) {
        rewards += parseFloat(node['rewards']);
    }

    return rewards;
  }

  isClaimable(nodes) {
    for (const node of nodes) {
      if (node.nextProcessingTime <= Date.now()) {
        return true;
      }
    }
    return false;
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
    await this.web3AddressPromise;

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
        console.log('ERR', e);
      }
    }

    return nodes;
  }
}

export default PentagonContract;
