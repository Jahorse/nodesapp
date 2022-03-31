import { ethers } from 'ethers';

import abi from './abi/ascend-meta';
import Ascend from './AscendContract';

class AscendMeta extends Ascend {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x397dcC7841d31d80A67C0aD17b9dA4381850B00A',
      'Meta',
    );
  }

  async claimAll() {
    if (this.walletAddresses.length > 1) {
      console.error('Cannot claim multiple addresses at once.');
      return;
    }
    if (!this.signer) {
      console.error('Tried calling AscendMeta.claimAll() without a valid signer.');
      return null;
    }
    const metaContract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);
    const helperContract = new ethers.Contract(this.helperContractAddress, this.helperAbi, this.signer);

    const metaIds = await metaContract.getMetasOf(this.walletAddresses[0]);
    return helperContract.claimMeta(metaIds);
  }

  async fetchNodes() {
    const metaContract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);
    const rewardsContract = new ethers.Contract(this.rewardsContractAddress, this.rewardsAbi, this.jsonRpcProvider);

    const nodes = [];
    for (const address of this.walletAddresses) {
      try {
        const count = await metaContract.balanceOf(address);
        const rewards = parseInt((await rewardsContract.calculateRewardsMeta(address)).toHexString(), 16);
        const lastClaimSeconds = parseInt((await rewardsContract.calculateTimeToRewardsMeta(address)).toHexString(), 16);
        const lastClaimTime = Date.now() - (lastClaimSeconds * 1000);
        const nextProcessingTime = lastClaimTime + (84600 * 1000);

        if (count > 0) {
          const node = {
            name: `Meta x${count}`,
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

export default AscendMeta;
