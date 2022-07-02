import { ethers } from 'ethers';

import { nodesAbi, feesAbi, taxesAbi } from './abi/thor';
import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

const cashoutFeeDue = [
  604800,
  1209600,
  1814400,
  2332800,
];
const cashoutFeeTax = [
  50,
  40,
  30,
  20,
];
const minTax = {
  Heimdall: 1,
  Freya: 5,
  Thor: 8,
  Odin: 10,
}

class Thor extends Contract {
  metadata = {
    name: 'Thor',
    symbol: 'THOR',
    networkName: 'Avalanche',
    decimals: 4,
    claimSupport: true,
    hasCompound: false,
    appLink: 'https://app.thor.financial/',
    chartLink: 'https://dexscreener.com/avalanche/0x95189f25b4609120f72783e883640216e92732da',
    swapLink: 'https://traderjoexyz.com/trade?outputCurrency=0x8f47416cae600bccf9530e9f3aeaa06bdd1caa79#/',
  };

  feeContractAddress = '0x9aD4dF248019A36b29202aEC91a1b9aAA863341a';
  taxContractAddress = '0xD5945eFe9003349f7A05aF6a66D718dE6F087729';

  constructor(provider, walletAddresses, contractAddress, contractName) {
    super(provider, walletAddresses, 'Avalanche');

    this.metadata.name = `Thor ${contractName}`;

    this.contractAddress = contractAddress;
    this.contractName = contractName;

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceCg('thor');
  }

  async compoundAll() {
    console.error('ThorContract has no compoundAll().');
    return null;
  }

  async claimAll() {
    console.error('ThorContract has no claimAll().');
    return null;
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, nodesAbi, this.jsonRpcProvider);
    const feesContract = new ethers.Contract(this.feeContractAddress, feesAbi, this.jsonRpcProvider);
    const taxesContract = new ethers.Contract(this.taxContractAddress, taxesAbi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const tierCount = await contract._getNodeNumberOf(walletAddress);

        if (tierCount > 0) {
          const indexes = (await contract._getNodesIndex(walletAddress));
          const names = (await contract._getNodesNames(walletAddress)).split('#');
          const creationTimes = (await contract._getNodesCreationTime(walletAddress)).split('#');
          const lastClaimTimes = (await contract._getNodesLastClaimTime(walletAddress)).split('#');
          for (const i in indexes) {
            const nodeId = await contract.getNodeId(indexes[i]);
            const creationTime = creationTimes[i];
            const lastClaimTime = lastClaimTimes[i];
            const lastClaimDelta = (Date.now() / 1000) - lastClaimTime;

            const rewardRaw = await contract.getRewardAmountOf(indexes[i]);
            const dueDate = await feesContract.getDueDate(nodeId);
            const fee = await feesContract.getFee(nodeId, this.contractName.toUpperCase());

            const taxes = await taxesContract.getCashOutTaxFeeWithLastClaimTime(
              lastClaimDelta.toFixed(0),
              cashoutFeeDue,
              cashoutFeeTax,
              minTax[this.contractName],
            );
            const rewardAfterTaxes = parseInt(rewardRaw.toHexString(), 16) / 1e18;
            const rewards = rewardAfterTaxes / (taxes / 100);
            nodes.push({
              id: nodeId,
              tier: this.contractName,
              name: names[i],
              creationTime: new Date(creationTime * 1000),
              lastClaim: new Date(lastClaimTime * 1000),
              rewards,
              rewardAfterTaxes,
              dueDate: new Date(parseInt(dueDate.toString()) * 1000),
              fee: parseInt(fee.toString()) / 1e18,
            });
          }
        }
      } catch (e) {
        if (!e.reason.includes('NO NODE OWNER')) {
          console.log('ERR', e);
        }
      }
    }

    return nodes;
  }
}

export default Thor;
