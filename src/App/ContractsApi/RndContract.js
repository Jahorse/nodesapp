import Contract from './Contract';
import { getPriceCg } from '../Utils/Pricing';

class RndContract extends Contract {
  metadata = {
    name: 'RND',
    symbol: 'PLAYMATES',
    networkName: 'Avalanche',
    decimals: 2,
    claimSupport: false,
    hasCompound: false,
    appLink: 'https://redlightnodes.app/',
    chartLink: 'https://dexscreener.com/avalanche/0xfd17c7a2e1eee2ee2a308e43bdfbac4df135c5cd',
    swapLink: 'https://redlightnodes.app/swap',
  };

  constructor(provider, walletAddresses, contractAddress, contractName) {
    super(provider, walletAddresses, 'Avalanche');
    this.contractAddress = contractAddress;
    this.contractName = contractName;
    this.metadata.name = `RND ${contractName}`;

    this.fetchPromise = this.fetchNodes().then(n => this.nodes = n);
  }

  async getPriceUsd() {
    return await getPriceCg('redlight-node-district');
  }

  getTotalRewards(nodes, compounding) {
    let rewards = 0;
    for (const node of nodes) {
        rewards += parseFloat(node['rewards']);
    }

    return rewards;
  }

  async compoundAll() {
    console.error('AscendContract has no compoundAll().');
    return null;
  }

  async claimAll() {
    console.error('AscendContract has no claimAll().');
    return null;
  }

  async fetchNodes() {
    console.error('Abstract function.');
    return;
  }
}

export default RndContract;