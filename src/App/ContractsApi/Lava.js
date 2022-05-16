import * as ethers from 'ethers';

import abi from './abi/lava';
import Contract from './Contract';
import { getPriceDg } from '../Utils/pricing';

const nodeTypes = {
  1: "Fuji",
  2: "Krakatoa",
  3: "Novarupta",
};

class Lava extends Contract {
  metadata = {
    name: 'Lava',
    symbol: 'LAVA',
    networkName: 'Avalanche',
    decimals: 2,
    claimSupport: true,
    hasCompound: true,
    appLink: 'https://app.lava.financial/',
    chartLink: 'https://dexscreener.com/avalanche/0xa82a2499543664096639be2653061dd5b627686a',
    swapLink: 'https://app.lava.financial/swap',
  };
  contractAddress = '0xDe7E9fd01018C59DEB46bC36316da555Eb889a27';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Avalanche');

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceDg('Avalanche', '0xf53cc73cf2638b330e62b094efedf0a7d9ee1b53');
  }

  async compoundAll() {
    if (!this.signer) {
      console.error('Tried calling LavaContract.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    return contract.createNodeWithTokens('NodesAppAutoCompound');
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling LavaContract.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    const nodeIds = this.nodes.map(n => n.id);
    return contract.claim(nodeIds, 10000, true, '0x0000000000000000000000000000000000000000');
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const nodeIds = await contract.getUserNodes(walletAddress);

        for (const i in nodeIds) {
          const nodeData = await contract.nodeData(nodeIds[i]);
          const reward = await contract.getClaimAmount(walletAddress, [nodeIds[i]], 10000, true, '0x0000000000000000000000000000000000000000');

          nodes.push({
            id: parseInt(nodeIds[i].toHexString()),
            name: nodeData.name,
            rewards: parseInt(reward.toHexString()) / 1e18,
            lastProcessingTime: new Date(parseInt(nodeData.lastClaim.toHexString()) * 1000),
            nextProcessingTime: Date.now(),
            tier: nodeTypes[parseInt(nodeData.tier.toHexString())],
            feesDue: new Date(parseInt(nodeData.paymentExpiry.toHexString()) * 1000),
          });
        }
      } catch (e) {
        console.log('ERR', e);
      }
    }

    return nodes;
  }
}

export default Lava;
