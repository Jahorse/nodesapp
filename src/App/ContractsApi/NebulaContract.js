import * as ethers from 'ethers';

import abi from './abi/nebula';
import Contract from './Contract';

class NebulaContract extends Contract {
  contractAddress = '0xd311d77c8F4665bdA9e684Cd08f8991f364AbEF5';
  claimContractAddress = '0x1aEa17a08EdE10D158baac969f809E6747cb2B22';
  claimContractAbi = [
    'function cashoutAll()', // Claim
  ];

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Avalanche');

    this.fetchPromise = this.fetchNodes().then(n => this.nodes = n);
  }

  hasCompound() { return false; }

  getName() { return `Nebula`; }

  getToken() { return 'NEBU'; }

  showDecimalPlaces() { return 3; }

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
    console.error('Nebula.compoundAll() is not implemented.');
    return;
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling Nebula.claimAll() without a valid signer.');
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
        const [nodeNames, lastClaims, creationTimes] = [
          (await contract.getNodesNames(walletAddress)).split('#'),
          (await contract.getNodesLastClaimTime(walletAddress)).split('#'),
          (await contract.getNodesCreationTime(walletAddress)).split('#'),
        ];

        for (const i in nodeNames) {
          const rewards = await contract.getNodeReward(walletAddress, creationTimes[i]);

          const node = {
            name: nodeNames[i],
            rewards: parseInt(rewards.toHexString(), 16) / 1e18,
            creationTime: new Date(parseInt(creationTimes[i]) * 1000),
            lastProcessingTime: lastClaims[i] ? new Date(parseInt(lastClaims[i]) * 1000) : 'Never',
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

export default NebulaContract;
