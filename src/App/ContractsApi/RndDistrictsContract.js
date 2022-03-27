import { ethers } from 'ethers';

import RndContract from './RndContract';
import abi from './abi/rnd-districts';

class RndDistrictsContract extends RndContract {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x9aDA04Af0B1c989A188F0063358f2d0530327386',
      'Districts',
    );
  }

  async claimAll() {
    console.error('RndDistricts.claimAll() not implemented');
    return;
  }

  async fetchNodes() {
    const districtsContract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const address of this.walletAddresses) {
      try {
        const districtIds = await districtsContract.getDistrictsOf(address);

        for (const districtId of districtIds) {
          const district = await districtsContract.getDistricts(districtId);
          const rewards = parseInt((await districtsContract.getRewardOf(districtId)).toHexString(), 16) / 1e18;

          const node = {
            name: district.name,
            rewards: rewards,
            creationTime: district.mint,
            lastProcessingTime: new Date(district.claim),
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

export default RndDistrictsContract;