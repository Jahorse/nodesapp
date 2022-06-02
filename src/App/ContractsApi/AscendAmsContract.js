import { ethers } from 'ethers';

import abi from './abi/ascend-ams';
import Ascend from './AscendContract';

class AscendAms extends Ascend {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0xC88Fff4aDF86Adc2af20c57dF9B3b9eB7D664816',
      'AMS',
    );
  }

  async claimAll() {
    console.error("No claim all available for AMS");
    return null;
    // if (this.walletAddresses.length > 1) {
    //   console.error('Cannot claim multiple addresses at once.');
    //   return;
    // }
    // if (!this.signer) {
    //   console.error('Tried calling AscendAms.claimAll() without a valid signer.');
    //   return null;
    // }
    // const amsContract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    // const amsIds = this.nodes.map(n => n.id);
    // return amsContract.claimAll(amsIds);
  }

  async fetchNodes() {
    const amsContract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);
    const helperContract = new ethers.Contract(this.helperContractAddress, this.helperAbi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const nodeIds = await amsContract.getMembershipsOf(walletAddress);
        // const rewards = parseInt((await amsContract.getAddressRewards(walletAddress)).toHexString(), 16) / 1e18;

        if (nodeIds.length > 0) {
          // for (const nodeId of nodeIds) {
          //   const rewards = await amsContract.getRewardOf(nodeId, walletAddress);
          //   const rewardsAfterTax = await helperContract.calculateRewardsAmsAfterTaxes(walletAddress, rewards);
          //   const nodeInfo = await amsContract.getMemberships(nodeId);
          //   const node = {
          //     id: parseInt(nodeId.toHexString(), 16),
          //     name: `AMS #${nodeId}`,
          //     rewards: parseInt(rewards.toHexString(), 16) / 1e18,
          //     rewardsAfterTax: parseInt(rewardsAfterTax.toHexString(), 16) / 1e18,
          //     creationTime: new Date(nodeInfo.mint * 1000),
          //     lastProcessingTime: new Date(nodeInfo.claim * 1000),
          //     nextProcessingTime: Date.now(),
          //   };
          //   nodes.push(node);
          // }
          const rewards = await amsContract.getAddressRewards(walletAddress);
          const rewardsAfterTax = await helperContract.calculateRewardsAmsAfterTaxes(walletAddress, rewards);
          nodes.push({
            name: `AMS ${nodeIds.length}`,
            rewards: parseInt(rewards.toHexString(), 16) / 1e18,
            rewardsAfterTax: parseInt(rewardsAfterTax.toHexString(), 16) / 1e18,
          })
        }
      } catch (e) {
        console.log('ERR', e);
      }
    }

    return nodes;
  }
}

export default AscendAms;
