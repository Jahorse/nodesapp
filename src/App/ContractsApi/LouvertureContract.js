import * as ethers from 'ethers';
import { emitCustomEvent } from 'react-custom-events';

import abi from './abi/louverture';
import Contract from './Contract';
import { getPriceCg } from '../Utils/Pricing';

class Louverture extends Contract {
  metadata = {
    name: 'Louverture v1',
    symbol: 'LVT',
    networkName: 'Avalanche',
    decimals: 4,
    claimSupport: false, // TODO: Update to v2
    hasCompound: true,
    appLink: 'https://www.louverture.finance/blackhole',
    chartLink: 'https://dexscreener.com/avalanche/0xb16471a1c2e24c325151eaceb5543747787cd811',
    swapLink: 'https://traderjoexyz.com/trade?outputCurrency=0xd641e62525e830e98cb9d7d033a538a1f092ff34#/',
  };
  contractAddress = '0x3Cf1Dff7CCE2b7291456Bc2089b4bCB2AB5f311A';
  claimContractAddress = '0xff579d6259dedcc80488c9b89d2820bcb5609160';
  claimContractAbi = [
    'function addAllNodeValue()', // Compound
    'function cashoutAll()', // Claim
  ];

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Avalanche');

    this.fetchPromise = this.fetchNodes().then(n => this.nodes = n);
  }

  async getPriceUsd() {
    return await getPriceCg('louverture');
  }

  getTotalRewards(nodes, compounding) {
    let rewards = 0;
    for (const node of nodes) {
        rewards += parseFloat(node['rewards']);
    }

    return rewards;
  }

  async compoundAll() {
    if (!this.signer) {
      console.error('Tried calling Louverture.compoundAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.claimContractAddress, this.claimContractAbi, this.signer);
    return contract.addAllNodeValue();
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling Louverture.claimAll() without a valid signer.');
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
        const [nodeNames, lastClaims, creationTimes, rewards] = [
          (await contract._getNodesNames(walletAddress)).split('#'),
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
          };

          nodes.push(node);
        }
      } catch (e) {
        console.log('ERR', e);
      }
    }

    if (nodes.length > 0) {
      emitCustomEvent('avalanche-node', undefined);
    }
    return nodes;
  }
}

export default Louverture;
