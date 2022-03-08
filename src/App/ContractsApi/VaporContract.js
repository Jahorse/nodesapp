import { ethers } from 'ethers';

import Contract from './Contract';

class VaporContract extends Contract {
  nodeControllerAddress = '0xa1ce9bb5563822e320e2f7832a5df17a13b951ae';
  nodeControllerAbi = [
    'function getAllNodesRewards(address _account) view returns (uint256)',
    'function getNodeRewards(address _account, uint256 _creationTime) view returns (uint256)',
  ];
  nodeManagerAddress = '0x327edeD9E49E4e82d686b0d69e4CC4A8F80aAfBb';
  nodeManagerAbi = [
    'function compoundAll()',
    'function claimAll()',
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

    this.fetchPromise = this.fetchNodes().then(n => this.nodes = n);
  }

  hasCompound() { return true; }

  getName() { return 'Vapor'; }

  getToken() { return 'VPND'; }

  showDecimalPlaces() { return 2; }

  getTotalRewards(nodes, compounding) {
    let rewards = 0;
    for (const node of nodes) {
      rewards += parseFloat(node['rewards']);
    }

    return rewards;
  }

  isClaimable(planets) {
    for (const planet of planets) {
      if (planet.nextProcessingTime < Date.now()) {
        return true;
      }
    }

    return false;
  }

  async compoundAll() {
    if (!this.signer) {
      console.error('Tried calling VaporContract.compoundAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.nodeManagerAddress, this.nodeManagerAbi, this.signer);
    return contract.compoundAll();
  }

  async claimAll(signr) {
    if (!this.signer) {
      console.error('Tried calling VaporContract.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.nodeManagerAddress, this.nodeManagerAbi, this.signer);
    return contract.claimAll();
  }

  async fetchNodes() {
    const storageContract = new ethers.Contract(this.nodeStorageAddress, this.nodeStorageAbi, this.jsonRpcProvider);
    const controllerContract = new ethers.Contract(this.nodeControllerAddress, this.nodeControllerAbi, this.jsonRpcProvider);

    const nodes = [];
    for (const address of this.walletAddresses) {
      try {
        const rawNodes = await storageContract.getAllNodes(address);

        for (const rawNode of rawNodes) {
          if (rawNode['deleted'] === true) {
            continue;
          }

          const rewards = await controllerContract.getNodeRewards(address, rawNode['creationTime'].toNumber());
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
            creationTime: new Date(rawNode['creationTime'].toString() * 1000),
            lastProcessingTime,
            nextProcessingTime,
            amount: parseInt(rawNode['amount'].toHexString(), 16) / 1e18,
            rewards: parseInt(rewards.toHexString(), 16) / 1e18,
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

export default VaporContract;