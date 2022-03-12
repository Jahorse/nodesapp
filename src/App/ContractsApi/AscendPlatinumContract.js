import { ethers } from 'ethers';

import abi from './abi/ascend-platinum';
import AscendContract from './AscendContract';

class AscendPlatinumContract extends AscendContract {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x479C7aB08a72e004023E27aA1166814CAf9D2718',
      'Platinum',
    );
  }

  async claimAll() {
    if (this.walletAddresses.length > 1) {
      console.error('Cannot claim multiple addresses at once.');
      return;
    }
    if (!this.signer) {
      console.error('Tried calling AscendPlatinum.claimAll() without a valid signer.');
      return null;
    }
    const platinumContract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);
    const helperContract = new ethers.Contract(this.helperContractAddress, this.helperAbi, this.signer);

    const platinumIds = await platinumContract.getPlatinumsOf(this.walletAddresses[0]);
    return helperContract.claimPlatinum(platinumIds);
  }

  async fetchNodes() {
    const platinumContract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);
    const rewardsContract = new ethers.Contract(this.rewardsContractAddress, this.rewardsAbi, this.jsonRpcProvider);

    const nodes = [];
    for (const address of this.walletAddresses) {
      try {
        const count = await platinumContract.balanceOf(address);
        const rewards = parseInt((await rewardsContract.calculateRewardsPlatinum(address)).toHexString(), 16);
        const lastClaimSeconds = parseInt((await rewardsContract.calculateTimeToRewardsRewardsPlatinum(address)).toHexString(), 16);
        const lastClaimTime = Date.now() - (lastClaimSeconds * 1000);
        const nextProcessingTime = lastClaimTime + (84600 * 1000);

        if (count > 0) {
          const node = {
            name: `Platinum x${count}`,
            rewards: rewards,
            lastProcessingTime: new Date(lastClaimTime),
            nextProcessingTime,
          };
          nodes.push(node);
        }
      } catch (e) {
        console.log('ERR', e);
      }
      return nodes;
    }
  }
}

export default AscendPlatinumContract;
