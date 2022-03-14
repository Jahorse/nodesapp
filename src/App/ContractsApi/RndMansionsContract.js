import { ethers } from 'ethers';

import RndContract from './RndContract';
import abi from './abi/rnd-mansions';

class RndMansionsContract extends RndContract {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0xc4a25F823582d9ccf5cf8C8BF5338073e7a51676',
      'Mansions',
    );
  }

  async claimAll() {
    console.error('RndMansions.claimAll() not implemented');
    return;
  }

  async fetchNodes() {
    const mansionsContract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const address of this.walletAddresses) {
      try {
        const mansionIds = await mansionsContract.getMansionsOf(address);

        for (const mansionId of mansionIds) {
          const mansion = await mansionsContract.getMansions(mansionId);
          const rewards = parseInt((await mansionsContract.getRewardOf(mansionId)).toHexString(), 16) / 1e18;

          const node = {
            name: mansion.name,
            rewards: rewards,
            creationTime: mansion.mint,
            lastProcessingTime: new Date(mansion.claim),
            nextProcessingTime: new Date(Date.now()),
          }
          nodes.push(node);
        }
      } catch (e) {
        console.log('ERR', e);
      }
      return nodes;
    }
  }
}

export default RndMansionsContract;