import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

class Rnd extends Contract {
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

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceCg('redlight-node-district');
  }

  async compoundAll() {
    console.error('RndContract has no compoundAll().');
    return null;
  }

  async claimAll() {
    console.error('RndContract has no claimAll().');
    return null;
  }

  async fetchNodes() {
    console.error('Abstract function.');
    return;
  }
}

export default Rnd;