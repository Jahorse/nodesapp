import { ethers } from 'ethers';

import abi from './abi/ascend-platinum';
import Ascend from './AscendContract';

class AscendPlatinum extends Ascend {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x4a1bcb925A6972c7E9195252DbD8fbccF545A00b',
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
    const platinumContract = new ethers.Contract(this.contractAddress, abi, this.signer);

    const platinumIds = this.nodes.map(n => n.id);
    return platinumContract.claim(this.walletAddresses[0], platinumIds);
  }

  async fetchNodes() {
    const platinumContract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);
    const helperContract = new ethers.Contract(this.helperContractAddress, this.helperAbi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const nodeIds = await platinumContract.getPlatinumsOf(walletAddress);
        const rewards = await platinumContract.getAddressRewards(walletAddress);
        const rewardsAfterTax = await helperContract.calculateRewardsPlatinumAfterTaxes(rewards);

        if (nodeIds.length > 0) {
          for (const nodeId of nodeIds) {
            const nodeInfo = await platinumContract.getPlatinums(nodeId);
            const node = {
              id: parseInt(nodeId.toHexString(), 16),
              name: `Platinum #${nodeId}`,
              rewards: parseInt(rewards.toHexString(), 16) / 1e18,
              rewardsAfterTax: parseInt(rewardsAfterTax.toHexString(), 16) / 1e18,
              creationTime: new Date(nodeInfo.mint * 1000),
              lastProcessingTime: new Date(nodeInfo.claim * 1000),
              nextProcessingTime: Date.now(),
            };
            nodes.push(node);
          }
        }
      } catch (e) {
        console.log('ERR', e);
      }

      return nodes;
    }
  }
}

export default AscendPlatinum;
