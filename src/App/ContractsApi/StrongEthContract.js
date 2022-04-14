import { ethers } from 'ethers';

import abi from "./abi/strong-eth.js";
import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

class StrongEth extends Contract {
  metadata = {
    name: 'Strong ETH',
    symbol: 'STRNGR',
    networkName: 'Ethereum',
    decimals: 2,
    claimSupport: false,
    hasCompound: false,
    appLink: 'https://app.strongblock.com/',
    chartLink: 'https://dexscreener.com/ethereum/0x453a43e2bf3080f7a23c9bb034ccdd869e306102',
    swapLink: 'https://app.uniswap.org/#/swap?outputCurrency=0xdc0327d50e6c73db2f8117760592c8bbf1cdcf38&chain=mainnet',
  };
  contractAddress = '0xFbdDaDD80fe7bda00B901FbAf73803F2238Ae655';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Ethereum');

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceCg('stronger');
  }

  async compoundAll() {
    console.error('StrongEth.claimcompoundAll() is not implemented.');
    return null;
  }

  async claimAll() {
    console.error('StrongEth.claimAll() is not implemented.');
    return null;
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const count = await contract.entityNodeCount(walletAddress);

        if (count < 1) {
          continue;
        }

        let rewards = 0;
        for (let i=1; i<=count; i++) {
          const reward = await contract.getReward(walletAddress, i);
          rewards += parseInt(reward.toHexString(), 16) / 1e18;
        }

        nodes.push({
          name: `${walletAddress.substring(0,8)}`,
          rewards: rewards,
          nextProcessingTime: Date.now(),
        });

      } catch (e) {
        console.log('ERR', e);
      }
    }

    return nodes;
  }
}

export default StrongEth;