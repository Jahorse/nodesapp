import { ethers } from 'ethers';

import abi from './abi/ascend-ams';
import AscendContract from './AscendContract';

class AscendAmsContract extends AscendContract {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x5867843f6C4d13a54f7565dB8d31E716112BEBFC',
      'AMS',
    );
  }

  async claimAll() {
    if (this.walletAddresses.length > 1) {
      console.error('Cannot claim multiple addresses at once.');
      return;
    }
    if (!this.signer) {
      console.error('Tried calling AscendAms.claimAll() without a valid signer.');
      return null;
    }
    const amsContract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);
    const helperContract = new ethers.Contract(this.helperContractAddress, this.helperAbi, this.signer);

    const amsIds = await amsContract.getMembershipsOf(this.walletAddresses[0]);
    return helperContract.claimAll(amsIds);
  }

  async fetchNodes() {
    const amsContract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);
    const rewardsContract = new ethers.Contract(this.rewardsContractAddress, this.rewardsAbi, this.jsonRpcProvider);

    const nodes = [];
    for (const address of this.walletAddresses) {
      try {
        const count = await amsContract.balanceOf(address);
        const rewards = parseInt((await amsContract.getAddressRewards(address)).toHexString(), 16) / 1e18;
        const lastClaimSeconds = parseInt((await rewardsContract.calculateTimeToRewardsRewardsAms(address)).toHexString(), 16);
        const lastClaimTime = Date.now() - (lastClaimSeconds * 1000);
        const nextProcessingTime = lastClaimTime + (84600 * 1000);

        if (count > 0) {
          const node = {
            name: `Ams x${count}`,
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

export default AscendAmsContract;
