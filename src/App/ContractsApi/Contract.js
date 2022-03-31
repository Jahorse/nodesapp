import { emitCustomEvent } from 'react-custom-events';

class Contract {
  constructor(provider, walletAddresses, networkName) {
    if(this.constructor === Contract){
      throw new Error("Instance of abstract Contract class cannot be instantiated");
    }

    if (provider.networkName === networkName && provider.ethers.web3) {
      this.web3Provider = provider.ethers.web3;
    }
    if (provider.networkName === networkName && provider.ethers.signer) {
      this.signer = provider.ethers.signer;
    }

    this.jsonRpcProvider = provider.ethers[networkName.toLowerCase()];
    this.walletAddresses = [...walletAddresses];

    this.nodes = [];
  }

  getTotalRewards() {
    let rewards = 0;
    for (const node of this.nodes) {
        rewards += parseFloat(node.rewards);
    }
    return rewards;
  }

  async getRewardsUsd() {
    return parseFloat(parseFloat(this.getTotalRewards() * (await this.getPriceUsd())).toFixed(2));
  }

  timeUntilClaim() {
    const now = Date.now();

    let shortestTimeDiff = Number.MAX_SAFE_INTEGER;
    for (const node of this.nodes) {
      const timeDiff = node.nextProcessingTime - now;
      if (timeDiff < shortestTimeDiff) {
        shortestTimeDiff = timeDiff;
      }
    }

    if (shortestTimeDiff/100 <= 20) {
      return 0;
    }
    return shortestTimeDiff;
  }

  async compoundAll() {
    throw new Error('Calling an abstract method.');
  }

  async claimAll() {
    throw new Error('Calling an abstract method.');
  }

  async initNodes() {
    this.fetchPromise = this.fetchNodes().then(n => {
      this.nodes = n;
      if (this.nodes.length > 0) {
        emitCustomEvent(`${this.metadata.networkName.toLowerCase()}-node`, { rewards: this.getRewardsUsd() });
      }
    });
  }

  async getNodes() {
    await this.fetchPromise;

    return this.nodes;
  }
}

export default Contract;