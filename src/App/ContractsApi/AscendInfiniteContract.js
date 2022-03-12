import { ethers } from 'ethers';

import abi from './abi/ascend-meta';
import AscendContract from './AscendContract';

class AscendInfiniteContract extends AscendContract {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x4d80c0c467DA74f684A2Ee5AE3a5E9C96a754fcd',
      'Infinite',
    );
  }

  async claimAll() {
    if (this.walletAddresses.length > 1) {
      console.error('Cannot claim multiple addresses at once.');
      return;
    }
    if (!this.signer) {
      console.error('Tried calling AscendInfinite.claimAll() without a valid signer.');
      return null;
    }
    const metaContract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);
    const helperContract = new ethers.Contract(this.helperContractAddress, this.helperAbi, this.signer);

    const metaIds = await metaContract.getInfinitesOf(this.walletAddresses[0]);
    return helperContract.claimInfinite(metaIds);
  }

  async fetchNodes() {
    const metaContract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);
    const rewardsContract = new ethers.Contract(this.rewardsContractAddress, this.rewardsAbi, this.jsonRpcProvider);

    const nodes = [];
    for (const address of this.walletAddresses) {
      try {
        const count = await metaContract.balanceOf(address);
        const rewards = parseInt((await rewardsContract.calculateRewardsInfinite(address)).toHexString(), 16);
        const lastClaimSeconds = parseInt((await rewardsContract.calculateTimeToRewardsRewardsInfinite(address)).toHexString(), 16);
        const lastClaimTime = Date.now() - (lastClaimSeconds * 1000);
        const nextProcessingTime = lastClaimTime + (84600 * 1000);

        if (count > 0) {
          const node = {
            name: `Infinite x${count}`,
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

export default AscendInfiniteContract;
