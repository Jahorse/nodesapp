import { ethers } from 'ethers';

import abi from './abi/ascend-infinite';
import Ascend from './AscendContract';

class AscendInfinite extends Ascend {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x3B9dd6ea99D0c88931D5DbbF36a0FAE82b58b210',
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
    const infiniteContract = new ethers.Contract(this.contractAddress, abi, this.signer);

    const infiniteIds = this.nodes.map(n => n.id);
    return infiniteContract.claim(this.walletAddresses[0], infiniteIds);
  }

  async fetchNodes() {
    const infiniteContract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);
    const helperContract = new ethers.Contract(this.helperContractAddress, this.helperAbi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const nodeIds = await infiniteContract.getInfinitesOf(walletAddress);
        // const rewards = parseInt((await infiniteContract.getAddressRewards(walletAddress)).toHexString(), 16) / 1e18;

        if (nodeIds.length > 0) {
          for (const nodeId of nodeIds) {
            // const rewards = await infiniteContract.getRewardOf(nodeId, walletAddress);
            const rewards = await infiniteContract.getAddressRewards(walletAddress);
            const rewardsAfterTax = await helperContract.calculateRewardaInfiniteAfterTaxes(rewards);
            const nodeInfo = await infiniteContract.getInfinites(nodeId);
            const node = {
              id: parseInt(nodeId.toHexString(), 16),
              name: `Infinite #${nodeId}`,
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

export default AscendInfinite;
