import * as ethers from 'ethers';

import {
  managerAbi,
  tokenAbi,
} from './abi/atlas';
import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

class Atlas extends Contract {
  metadata = {
    name: 'Atlas',
    symbol: 'ATLAS',
    networkName: 'Fantom',
    decimals: 2,
    claimSupport: true,
    hasCompound: false,
    appLink: 'https://atlascloud.network/app',
    chartLink: 'https://dexscreener.com/fantom/0x3eb203a15777ff53c9221973487296b06e0d14ff',
    swapLink: 'https://spookyswap.finance/swap?outputCurrency=0x92df3eabf7c1c2a6b3d5793f6d53778ea78c48b2',
  };
  managerContractAddress = '0x2B90351a1dD1C48F27FbaB438e157645CDD1a728';
  tokenContractAddress = '0x4c4dcab8c8222BE395E987D523FfbF95944DF01b';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Fantom');

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceCg('atlas-cloud');
  }

  async compoundAll() {
    console.error('AtlasContract has no compoundAll().');
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
    const contract = new ethers.Contract(this.managerContractAddress, managerAbi, this.signer);
    return contract._cashoutAllNodesReward(this.walletAddresses[0]);
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.tokenContractAddress, tokenAbi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      const contractSigner = contract.connect(this.jsonRpcProvider.getSigner(walletAddress));
      try {
        const nodeNames = (await contractSigner.getNodesNames());
        const creationTimes = (await contractSigner.getNodesCreatime()).split('#');
        const claimTimes = (await contractSigner.getNodesLastClaims()).split('#');
        const rewards = (await contractSigner.calculateRewards());

        let lastClaim = 0;
        let firstCreation = Number.MAX_SAFE_INTEGER;
        for (const i in claimTimes) {
          if (parseInt(claimTimes[i]) > lastClaim) {
            lastClaim = claimTimes[i];
          }
          if (parseInt(creationTimes[i]) < firstCreation) {
            firstCreation = creationTimes[i];
          }
        }
        nodes.push({
          name: nodeNames,
          rewards: parseInt(rewards.toHexString(), 16) / 1e18,
          creationTime: new Date(firstCreation * 1000),
          lastProcessingTime: new Date(lastClaim * 1000),
          nextProcessingTime: Date.now(),
        });
      } catch (e) {
        if (!e.reason.includes('NO NODE OWNER')) {
          console.log('ERR', e);
        }
      }
    }

    return nodes;
  }
}

export default Atlas;
