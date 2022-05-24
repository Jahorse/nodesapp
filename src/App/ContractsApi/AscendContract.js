import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';
import abi from './abi/ascend-helper';

class Ascend extends Contract {
  metadata = {
    name: 'Ascend',
    symbol: 'ASND',
    networkName: 'Avalanche',
    decimals: 0,
    claimSupport: true,
    hasCompound: true,
    appLink: 'https://dapp.ascendnodeclub.money/',
    chartLink: 'https://dexscreener.com/avalanche/0x785a7356731dac36747cb46f4a98a80202aabb23',
    swapLink: 'https://traderjoexyz.com/trade?outputCurrency=0xfd0c58f03c83d6960bb9dbfd45076d78df2f095d#/',
  };
  helperContractAddress = '0x68D675bDb215f276A666EAF905ddBA739021D1b3';
  helperAbi = abi;

  constructor(provider, walletAddresses, contractAddress, contractName) {
    super(provider, walletAddresses, 'Avalanche');
    this.contractAddress = contractAddress;
    this.contractName = contractName;

    this.metadata.name = `Ascend ${contractName}`;

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceCg('ascend-node-club');
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

export default Ascend;
