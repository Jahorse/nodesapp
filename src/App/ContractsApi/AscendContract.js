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
    hasCompound: false,
    appLink: 'https://dapp.ascendnodeclub.money/',
    chartLink: 'https://dexscreener.com/avalanche/0x785a7356731dac36747cb46f4a98a80202aabb23',
    swapLink: 'https://traderjoexyz.com/trade?outputCurrency=0xfd0c58f03c83d6960bb9dbfd45076d78df2f095d#/',
  };
  rewardsContractAddress = '0xc1362C2141554B937C2b7585be44cDE4064704D7';
  rewardsAbi = [
    'function calculateRewardsInfinite(address from) external view returns (uint256)',
    'function calculateRewardsMeta(address from) external view returns (uint256)',
    'function calculateRewardsPlatinum(address from) external view returns (uint256)',
    'function calculateTimeToRewardsMeta(address from) external view returns (uint256)',
    'function calculateTimeToRewardsRewardsAms(address from) external view returns (uint256)',
    'function calculateTimeToRewardsRewardsInfinite(address from) external view returns (uint256)',
    'function calculateTimeToRewardsRewardsPlatinum(address from) external view returns (uint256)',
  ];
  helperContractAddress = '0x9043d768aA7E4BeE3F14dbe6E82a6175675fd75f';
  helperAbi = abi;

  constructor(provider, walletAddresses, contractAddress, contractName) {
    super(provider, walletAddresses, 'Avalanche');
    this.contractAddress = contractAddress;
    this.contractName = contractName;

    this.metadata.name = `Ascend ${contractName}`;

    this.fetchPromise = this.fetchNodes().then(n => this.nodes = n);
  }

  async getPriceUsd() {
    return await getPriceCg('ascend-node-club');
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

export default Ascend;
