import * as ethers from 'ethers';

import abi from './abi/hive';
import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

class Hive extends Contract {
  metadata = {
    name: 'Hive',
    symbol: 'HNY',
    networkName: 'Polygon',
    decimals: 4,
    claimSupport: true,
    hasCompound: false,
    appLink: 'https://dapp.hive.investments/',
    chartLink: 'https://dexscreener.com/polygon/0x94741bb69d8430d9b754c374072ecd04b448ee31',
    swapLink: 'https://app.sushi.com/swap?outputCurrency=0x1fa2f83ba2df61c3d370071d61b17be01e224f3a',
  };
  contractAddress = '0x19E46Be2e3aD8968a6230C8fb140C4CCaBC3ce0d';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Polygon');

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceCg('hive-investments-honey');
  }

  async compoundAll() {
    console.error('HiveContract has no compoundAll().');
    return null;
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling HiveContract.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    const nodeIds = this.nodes.map(n => n.id);
    return contract.claimRewards(nodeIds, 0);
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const count = await contract.balanceOf(walletAddress);
        if (count === 0) {
          return nodes;
        }

        const nodeIds = [];
        const maxNodes = 40000;
        const increment = 10000;

        let current = 0;
        while (current < maxNodes) {
          const tempNodeIds = await contract.getTokensOwnedByWallet(walletAddress, current, current + increment - 1);
          for (const tempNodeId of tempNodeIds) {
            nodeIds.push(tempNodeId);
          }
          current += increment;
        }

        const rewards = await contract.getTokenRewards(nodeIds);
        // for (const nodeId of nodeIds) {
          // const emissionRate = await contract.getTokensEmissionRate(nodeId);
          // const isMaintenanceFeePaid = await contract.isMaintenanceFeePaid(walletAddress);
          // const maintenanceFeeToPay = await contract.maintenanceFeeToPay(walletAddress);
        // }
        for (const i in rewards) {
          nodes.push({
            id: parseInt(nodeIds[i].toString()),
            rewards: parseInt(rewards[i].toString()) / 1e18,
            nextProcessingTime: Date.now(),
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

export default Hive;
