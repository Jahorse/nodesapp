import * as ethers from 'ethers';

import {
  contractAbi,
  distributionAbi,
} from './abi/cronodes';
import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

class Cronodes extends Contract {
  metadata = {
    name: 'Cronodes',
    symbol: 'CRN',
    networkName: 'Cronos',
    decimals: 4,
    claimSupport: true,
    hasCompound: false,
    appLink: 'https://cronodes.app/',
    chartLink: 'https://dexscreener.com/cronos/0x3ca50d07b1cfb4a4e61ee8d00c2ef1af6e42cee8',
    swapLink: 'https://app.cronaswap.org/swap?outputCurrency=0x8174bac1453c3ac7caed909c20ceadeb5e1cda00',
  };
  contractAddress = '0x8174BaC1453c3AC7CaED909c20ceaDeb5E1CDA00';
  distributionContractAddress = '0x6aD4Ff63fD7CF6672eE33Cdad8e3EE14Bad52B4E';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Cronos');

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceCg('cronodes');
  }

  async compoundAll() {
    console.error('CronodesContract has no compoundAll().');
    return null;
  }

  async claimAll() {
    if (this.walletAddresses.length > 1) {
      console.error('Cannot claim multiple addresses at once.');
      return;
    }
    if (!this.signer) {
      console.error('Tried calling AtlasContract.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.distributionContractAddress, distributionAbi, this.signer);
    return contract.claimReward();
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, contractAbi, this.jsonRpcProvider);
    const distributionContract = new ethers.Contract(this.distributionContractAddress, distributionAbi, this.jsonRpcProvider);
    const currentBlock = await this.jsonRpcProvider.getBlockNumber();
    const currentTimestamp = await this.jsonRpcProvider.getBlock(currentBlock).then(b => b.timestamp);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const nodeCount = parseInt((await contract.getNodeNumberOf(walletAddress)).toHexString(), 16);
        if (nodeCount > 1) {
          const lastClaimBlock = await distributionContract.getLastClaimedBlock(walletAddress);
          const lastClaimTime = await this.jsonRpcProvider.getBlock(lastClaimBlock.toHexString()).then(b => b.timestamp);

          const nextClaimBlock = parseInt((await distributionContract.getNextClaimBlock(walletAddress)).toHexString(), 16);
          let nextClaimTime = Date.now();
          if (nextClaimBlock > currentBlock) {
            const blockDiff = nextClaimBlock - currentBlock;
            const timeDiffSecs = blockDiff * 6;
            nextClaimTime = (currentTimestamp + timeDiffSecs) * 1000;
          }

          const blocksSinceClaim = currentBlock - lastClaimBlock;
          const daysSinceClaim = (blocksSinceClaim - (blocksSinceClaim % 14400)) / 14400;
          const rewards = (nodeCount * daysSinceClaim * 0.5);

          nodes.push({
            name: `Cronodes-${nodeCount}`,
            lastProcessingTime: new Date(lastClaimTime * 1000),
            nextProcessingTime: nextClaimTime,
            rewards,
          });
        }
      } catch (e) {
        console.log('ERR', e);
      }
    }

    return nodes;
  }
}

export default Cronodes;
