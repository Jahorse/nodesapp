import { ethers } from 'ethers';

import abi from './abi/vapor';
import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

class Vapor extends Contract {
  metadata = {
    name: 'Vapor',
    symbol: 'VPND',
    networkName: 'Avalanche',
    decimals: 2,
    claimSupport: true,
    hasCompound: true,
    appLink: 'https://app.vapornodes.finance/',
    chartLink: 'https://dexscreener.com/avalanche/0x4cd20f3e2894ed1a0f4668d953a98e689c647bfe',
    swapLink: 'https://traderjoexyz.com/trade?outputCurrency=0x83a283641c6b4df383bcddf807193284c84c5342#/',
  };
  nodeControllerAddress = '0xCd5E168dA3456cD2d5A8ab400f9cebdDC453720d';
  nodeControllerAbi = abi;
  vaporControllerAddress = '0x0AE678c5Eed6aF7937c7993E3B1b4978C987C2b2';
  vaporControllerAbi = [
    'function compound(uint256[] _ids)',
    'function claim(uint256[] _ids, bool isAVAX)',
  ];
  nodeStorageAddress = '0x14F65b7e04eB0a11FD1D0a3bdB08311299ab6048';
  nodeStorageAbi = [{
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address"
      }
    ],
    name: "getAllNodes",
    outputs: [
      {
          components:
          [
              {
                  internalType: "string",
                  name: "name",
                  type: "string"
              },
              {
                  internalType: "uint256",
                  name: "creationTime",
                  type: "uint256"
              },
              {
                  internalType: "uint256",
                  name: "lastClaimTime",
                  type: "uint256"
              },
              {
                  internalType: "uint256",
                  name: "lastCompoundTime",
                  type: "uint256"
              },
              {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256"
              },
              {
                  internalType: "bool",
                  name: "deleted",
                  type: "bool"
              },
          ],
          internalType: "struct NodeStorage.NodeEntity[]",
          name: "",
          type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  }];

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Avalanche');

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceCg('vapornodes');
  }

  async compoundAll() {
    if (!this.signer) {
      console.error('Tried calling VaporContract.compoundAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.vaporControllerAddress, this.vaporControllerAbi, this.signer);
    let ids = [];
    for (let i=0; i < this.nodes.length; i++) {
      ids.push(i);
    }
    return contract.compound(ids);
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling VaporContract.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.vaporControllerAddress, this.vaporControllerAbi, this.signer);
    let ids = [];
    for (let i=0; i < this.nodes.length; i++) {
      ids.push(i);
    }
    return contract.claim(ids, true);
  }

  async fetchNodes() {
    const storageContract = new ethers.Contract(this.nodeStorageAddress, this.nodeStorageAbi, this.jsonRpcProvider);
    const controllerContract = new ethers.Contract(this.nodeControllerAddress, this.nodeControllerAbi, this.jsonRpcProvider);

    const nodes = [];
    for (const address of this.walletAddresses) {
      try {
        const rawNodes = await storageContract.getAllNodes(address);

        for (const i in rawNodes) {
          const rawNode = rawNodes[i];
          if (rawNode['deleted'] === true) {
            continue;
          }

          const rewards = await controllerContract.getNodeRewards(address, i);
          let lastProcessingTime;
          if (rawNode['lastClaimTime'] > rawNode['lastCompoundTime']) {
            lastProcessingTime = new Date(rawNode['lastClaimTime'].toString() * 1000);
          } else {
            lastProcessingTime = new Date(rawNode['lastCompoundTime'].toString() * 1000);
          }
          const nextProcessingTime = new Date(lastProcessingTime);

          const node = {
            // Standard fields
            name: rawNode['name'],
            creationTime: rawNode['creationTime'].toString(),
            lastProcessingTime,
            nextProcessingTime,
            amount: parseInt(rawNode['amount'].toHexString(), 16) / 1e18,
            rewards: parseInt(rewards[rewards.length - 1].toHexString(), 16) / 1e18,
          }
          nodes.push(node);
        }

        return nodes;
      } catch (e) {
        console.log('ERR', e);
      }
    }

    return null;
  }
}

export default Vapor;