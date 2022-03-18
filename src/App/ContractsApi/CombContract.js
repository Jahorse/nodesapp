import * as ethers from 'ethers';

import {
  claimAbi,
  nodeQueryAbi,
} from './abi/comb';
import Contract from './Contract';
import { getPriceCg } from '../Utils/Pricing';

class CombContract extends Contract {
  metadata = {
    name: 'Comb',
    symbol: 'COMB',
    networkName: 'Fantom',
    decimals: 2,
    claimSupport: false,
    hasCompound: false,
    appLink: 'https://app.comb.financial/dashboard',
    chartLink: 'https://dexscreener.com/fantom/0x95297492b1faa6047d1d8ce982a0f5cdeb0e9482',
    swapLink: 'https://swap.spiritswap.finance/#/swap?outputCurrency=0xae45a827625116d6c0c40b5d7359ecf68f8e9afd',
  };
  nodeQueryContractAddress = '0x3e844BF3F21eFEB4B8E9c32cDD772822DB07F306';
  claimContractAddress = '0xC89c5096d08F3F8238b5Fb43484AD6F5FF52F9F6';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Fantom');

    this.fetchPromise = this.fetchNodes().then(n => this.nodes = n);
  }

  async getPriceUsd() {
    return await getPriceCg('pentagon-finance');
  }

  getTotalRewards(nodes, compounding) {
    let rewards = 0;
    for (const node of nodes) {
        rewards += parseFloat(node['rewards']);
    }

    return rewards;
  }

  async compoundAll() {
    console.error('CombContract has no compoundAll().');
    return null;
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling CombContract.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.claimContractAddress, claimAbi, this.signer);
    return contract.cashoutAll();
  }

  async fetchNodes() {

    const contract = new ethers.Contract(this.nodeQueryContractAddress, nodeQueryAbi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const [ nodeNames, creationTimes ] = [
          (await contract.getNodeNames(walletAddress)).split('#'),
          // (await contract.getNodesMetadata(walletAddress)).split('#'),
          (await contract.getNodesCreationTime(walletAddress)).split('#'),
        ];
        const rewards = await contract.getRewardAmountOf(walletAddress);

        nodes.push({
          name: nodeNames.join('#'),
          creationTime: creationTimes.join('#'),
          rewards: parseInt(rewards.toHexString(), 16) / 1e18,
          nextProcessingTime: Date.now(),
        });
      } catch (e) {
        if (!e.reason.includes('No nodes')) {
          console.log('ERR', e);
        }
      }
    }

    return nodes;
  }
}

export default CombContract;
