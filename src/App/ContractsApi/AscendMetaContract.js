import { ethers } from 'ethers';

import amsAbi from './abi/ascend-ams';
import infiniteAbi from './abi/ascend-infinite';
import abi from './abi/ascend-meta';
import Ascend from './AscendContract';

class AscendMeta extends Ascend {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x5DB97004E839151639839eEfE266BDcB14D2c507',
      'Meta',
    );
  }

  async compoundAll() {
    if (this.walletAddresses.length > 1) {
      console.error('Cannot claim multiple addresses at once.');
      return;
    }
    if (!this.signer) {
      console.error('Tried calling AscendMeta.claimAll() without a valid signer.');
      return null;
    }

    const walletAddress = this.walletAddresses[0];

    const amsContract = new ethers.Contract('0xC88Fff4aDF86Adc2af20c57dF9B3b9eB7D664816', amsAbi, this.jsonRpcProvider);
    const amsIds = await amsContract.getMembershipsOf(walletAddress);
    if (amsIds.length < 50) {
      console.error('50 AMS required to compound.');
      return null;
    }

    const infiniteContract = new ethers.Contract('0x3B9dd6ea99D0c88931D5DbbF36a0FAE82b58b210', infiniteAbi, this.jsonRpcProvider);
    const infiniteIds = await infiniteContract.getInfinitesOf(walletAddress);
    if (amsIds.length < 1) {
      console.error('1 infinite required to compound.');
      return null;
    }

    // Need total rewards to be > 1000
    const calculatorContract = new ethers.Contract('0x781a7ED06aEf134526Fb8650ab182B72DAc5BaC2', ['function calculateAllRewards(address from) external view returns (uint256)'], this.jsonRpcProvider);
    const asndContract = new ethers.Contract('0xFd0c58F03c83d6960BB9dbFd45076d78Df2F095D', ['function balanceOf(address from) external view returns (uint256)'], this.jsonRpcProvider);
    const rewards = parseInt((await calculatorContract.calculateAllRewards(walletAddress)).toHexString(), 16) / 1e18;
    const asndBalance = parseInt((await asndContract.balanceOf(walletAddress)).toHexString(), 16) / 1e18;
    const total = rewards + asndBalance;
    if (total < 1000) {
      console.error('1000 ASND required between your wallet and pending rewards.');
      return null;
    }

    const metaContract = new ethers.Contract(this.contractAddress, abi, this.signer);
    return metaContract.createMultipleNodeWithRewards('NodesApp Meta', amsIds.slice(0, 50), infiniteIds);
  }

  async claimAll() {
    console.error("No claim all available for meta.")
    return null;
    // if (this.walletAddresses.length > 1) {
    //   console.error('Cannot claim multiple addresses at once.');
    //   return;
    // }
    // if (!this.signer) {
    //   console.error('Tried calling AscendMeta.claimAll() without a valid signer.');
    //   return null;
    // }
    // const metaContract = new ethers.Contract(this.contractAddress, abi, this.signer);

    // const metaIds = this.nodes.map(n => n.id);
    // return metaContract.claim(this.walletAddresses[0], metaIds);
  }

  async fetchNodes() {
    const metaContract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);
    const helperContract = new ethers.Contract(this.helperContractAddress, this.helperAbi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const nodeIds = await metaContract.getMetasOf(walletAddress);

        if (nodeIds.length > 0) {
          const rewards = await metaContract.getAddressRewards(walletAddress);
          const rewardsAfterTax = await helperContract.calculateRewardaMetaAfterTaxes(walletAddress, rewards);
          const rewardsParsed = parseInt(rewards.toHexString(), 16) / 1e18;
          const rewardsAfterTaxParsed = parseInt(rewardsAfterTax.toHexString(), 16) / 1e18;
          const individualRewards = rewardsParsed / nodeIds.length;
          const individualRewardsAfterTax = rewardsAfterTaxParsed / nodeIds.length;
          for (const nodeId of nodeIds) {
            const nodeInfo = await metaContract.getMetas(nodeId);
            const node = {
              id: parseInt(nodeId.toHexString(), 16),
              name: `Meta #${nodeId}`,
              rewards: individualRewards,
              rewardsAfterTax: individualRewardsAfterTax,
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

export default AscendMeta;
