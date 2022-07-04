import * as ethers from 'ethers';

import abi from './abi/dominium';
import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

class Dominium extends Contract {
  metadata = {
    name: 'Dominium',
    symbol: 'DOM',
    networkName: 'Polygon',
    decimals: 2,
    claimSupport: true,
    hasCompound: false,
    appLink: 'https://app.dominium.finance/',
    chartLink: 'https://dexscreener.com/polygon/0x9913a93c082fdc69f9e7d146b0e4ce9070d5a104',
    swapLink: 'https://app.uniswap.org/#/swap?outputCurrency=0x0e2c818fea38e7df50410f772b7d59af20589a62&chain=polygon',
  };
  contractAddress = '0xa19274D381d93f003c185c03D5ACe5bFd00d71D9';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Polygon');

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceCg('dominium-2');
  }

  async compoundAll() {
    console.error('DominiumContract has no compoundAll().');
    return null;
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling DominiumContract.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    return contract.claimAll();
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const nftIds = (await contract.listAll(walletAddress));

        for (const nftId of nftIds) {
          const inventory = await contract.inventory(nftId);
          const nextClaimTimestamp = parseInt(inventory.nextTimestamp.toHexString(), 16);
          const lastClaimTimestamp = nextClaimTimestamp - parseInt(inventory.claimLength.toHexString(), 16);
          const dueDate = parseInt(inventory.feeExpiration.toHexString(), 16);
          const reward = await contract.claimableAmount(nftId);
          const type = parseInt((await contract.getTokenType(nftId)).toHexString(), 16);

          nodes.push({
            id: nftId,
            name: `Dominium-${nftId}`,
            rewards: parseInt(reward.toHexString(), 16) / 1e9,
            creationTime: undefined,
            lastProcessingTime: new Date(lastClaimTimestamp * 1000),
            nextProcessingTime: new Date(nextClaimTimestamp * 1000),
            dueDate: new Date(dueDate * 1000),
            type: type,
          });
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

export default Dominium;
