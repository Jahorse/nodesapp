class Contract {
  constructor(provider, walletAddresses, networkName) {
    if(this.constructor === Contract){
      throw new Error("Instance of abstract Contract class cannot be instantiated");
    }

    this.networkName = networkName;

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

  hasClaim() { throw new Error('Calling an abstract method.'); }
  hasCompound() { throw new Error('Calling an abstract method.'); }

  getNetworkName() { return this.networkName; }

  getName() { throw new Error('Calling an abstract method.'); }

  getToken() { throw new Error('Calling an abstract method.'); }

  getTotalRewards(planets, compounding) {
    let rewards = 0;
    for (const planet of planets) {
        rewards += parseFloat(planet['rewards']);
    }
    if (compounding) {
        rewards = rewards + (rewards * 0.1);
    }
    return rewards;
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

  async getNodes() {
    await this.fetchPromise;

    return this.nodes;
  }
}

export default Contract;