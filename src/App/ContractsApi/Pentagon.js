import * as ethers from 'ethers';

import abi from './abi/pentagon';
import Contract from './Contract';


class PentagonContract extends Contract {
  contractAddress = '0x1aEa18307D5063d9c4533Ac3093352B1DffeE2Fd';
  claimAddress = '0xF75BC031f362e55967Cf278586bBeB0954442D84';
  claimAbi = [
    'function cashoutAll()',
  ];
  "0x54557973"
  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Polygon');
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
     return true;
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
    const contract = new ethers.Contract(this.claimAddress, this.claimAbi, this.signer);
    return contract.cashoutAll();
  }

  async getNodes() {
    await this.web3AddressPromise;

    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

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
