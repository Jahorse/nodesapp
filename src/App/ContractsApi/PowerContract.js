import { ethers } from 'ethers';

import abi from './abi/thor';
import Contract from './Contract';

class PowerContract extends Contract {
  nodeManagerContractAddress = '0xa51b7f5071868d8bdc3619d9e5dddd5fb8c1ab90';
  tiersContractAddress = '0xf9F64b2c62210E6aCC266169da7026F209CeCd52';
  tiersContractAbi = [
    'function cashoutAll(string tierName)', // Claim
  ];

  constructor(provider, walletAddresses, contractAddress, contractName) {
    super(provider, walletAddresses, 'Fantom');
    this.contractAddress = contractAddress;
    this.contractName = contractName;

    this.fetchPromise = this.fetchNodes().then(n => this.nodes = n);
  }

  hasCompound() { return false; }

  getName() { return `Power ${this.contractName}`; }

  getToken() { return 'POWER'; }

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
      if (node.nextProcessingTime < Date.now()) {
        return true;
      }
    }
    return false;
  }

  async compoundAll() {
    console.error('PowerContract has no compoundAll().');
    return null;
  }

  async claimAllTier(tier) {
    if (!this.signer) {
      console.error('Tried calling Power.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.tiersContractAddress, this.tiersContractAbi, this.signer);
    return contract.cashoutAll(tier);
  }

  async fetchNodes() {

    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const address of this.walletAddresses) {
      try {
        const [nodeNames, lastClaims, creationTimes] = [
          (await contract._getNodesNames(address)).split('#'),
          (await contract._getNodesLastClaimTime(address)).split('#'),
          (await contract._getNodesCreationTime(address)).split('#'),
        ];

        for (const i in nodeNames) {
          const args = [ address, parseInt(creationTimes[i]) ];
          const reward = await contract._getNodeRewardAmountOf(...args);

          const node = {
            name: nodeNames[i],
            rewards: parseInt(reward) / 1e18,
            creationTime: new Date(+creationTimes[i] * 1000),
            lastProcessingTime: +lastClaims[i] ? new Date(lastClaims[i]) : 'Never',
            nextProcessingTime: Date.now(),
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

export default PowerContract;
