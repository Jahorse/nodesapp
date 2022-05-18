import * as ethers from 'ethers';

import abi from './abi/samurai';
import Contract from './Contract';
import { getPriceDg } from '../Utils/pricing';

const tiers = ['Buke', 'Mononofu', 'Musha'];

class Samurai extends Contract {
  metadata = {
    name: 'Samurai',
    symbol: 'HNR',
    networkName: 'Fantom',
    decimals: 3,
    claimSupport: true,
    hasCompound: false,
    appLink: 'https://app.samurai.financial/',
    chartLink: 'https://dexscreener.com/fantom/0x663684fb5cb68004f9e844b4950ee3e0ec0e20b6',
    swapLink: 'https://spookyswap.finance/swap?outputCurrency=0x36667966c79dec0dcda0e2a41370fb58857f5182',
  };
  contractAddress = '0x4f89c90E64AE57eaf805Ff2Abf868fE2aD6c55f3';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Fantom');

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceDg('Fantom', '0x36667966c79dec0dcda0e2a41370fb58857f5182');
  }

  async compoundAll() {
    console.error('SamuraiContract has no compoundAll().');
    return null;
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling SamuraiContract.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    const nodeIds = this.nodes.map(n => n.id);
    return contract.claimAllRewards(nodeIds);
  }

  async fetchNodes() {
    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);
      try {
        const count = await contract.balanceOf(walletAddress);

        for (let i=0; i<count; i++) {
          const nodeId = await contract.tokenOfOwnerByIndex(walletAddress, i);
          const nodeTraits = await contract.nodeTraits(nodeId);
          const tax = await contract.calculateSlidingTaxRate(nodeId);
          const rewards = await contract.calculateTotalDynamicRewards([nodeId]);

          nodes.push({
            id: nodeId,
            name: nodeTraits.name,
            tier: tiers[nodeTraits.tier],
            uri: await contract.tokenURI(nodeId),
            lastClaimTime: new Date(parseInt(nodeTraits.lastClaimTime.toHexString(), 16) * 1000),
            nextProcessingTime: Date.now(),
            fantomRPC: nodeTraits.fantomRPC,
            avalancheRPC: nodeTraits.avalancheRPC,
            polygonRPC: nodeTraits.polygonRPC,
            rewardsClaimed: parseInt(nodeTraits.rewardsClaimed.toHexString(), 16) / 1e18,
            rewards: parseInt(rewards.toHexString(), 16) / 1e18,
            tax: parseInt(tax.toHexString(), 16),
          });
        }
      } catch (e) {
        if (!e.reason.includes('Zero node owner') && !e.reason.includes('caller is not the Shogun')) {
          console.log('ERR', e);
        }
      }
    }

    return nodes;
  }
}

export default Samurai;
