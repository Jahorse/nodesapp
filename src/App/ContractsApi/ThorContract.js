import { ethers } from 'ethers';

import abi from './abi/thor';
import Contract from './Contract';
import { getPriceCg } from '../Utils';

class ThorContract extends Contract {
  metadata = {
    name: 'Thor',
    symbol: 'THOR',
    networkName: 'Avalanche',
    decimals: 4,
    hasClaim: false,
    hasCompound: false,
    chartLink: 'https://dexscreener.com/avalanche/0x95189f25b4609120f72783e883640216e92732da',
    swapLink: 'https://traderjoexyz.com/trade?outputCurrency=0x8f47416cae600bccf9530e9f3aeaa06bdd1caa79#/',
  };

  constructor(provider, walletAddresses, contractAddress, contractName) {
    super(provider, walletAddresses, 'Avalanche');

    this.metadata.name = `Thor ${contractName}`;

    this.contractAddress = contractAddress;
    this.contractName = contractName;

    this.fetchPromise = this.fetchNodes().then(n => this.nodes = n);
  }

  async getPriceUsd() {
    return await getPriceCg('thor');
  }

  getTotalRewards(nodes, compounding) {
    let rewards = 0;
    for (const node of nodes) {
        rewards += parseFloat(node['rewards']);
    }

    return rewards;
  }

  async compoundAll() {
    console.error('ThorContract has no compoundAll().');
    return null;
  }

  async claimAll() {
    console.error('ThorContract has no claimAll().');
    return null;
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const address of this.walletAddresses) {
      try {
        const [ nodeNames, lastClaims, creationTimes ] = [
          (await contract._getNodesNames(address)).split('#'),
          (await contract._getNodesLastClaimTime(address)).split('#'),
          (await contract._getNodesCreationTime(address)).split('#'),
        ];

        for (const i in nodeNames) {
          const args = [ address, creationTimes[i] ];
          const reward = await contract._getNodeRewardAmountOf(...args);

          const node = {
            name: nodeNames[i],
            rewards: +reward / 1e18,
            creationTime: new Date(+creationTimes[i] * 1000),
            lastProcessingTime: +lastClaims[i] ? new Date(lastClaims[i]) : 'Never',
            nextProcessingTime: Date.now(),
          };

          nodes.push(node);
        }
      } catch (e) {
        if (!e.reason.includes('NO NODE OWNER')) {
          console.log('ERR', e);
        }
      }
    }

    return nodes;
  }
}

export default ThorContract;
