const abi = [
  {
      "inputs":
      [
          {
              "internalType": "uint8",
              "name": "_rewardPerNode",
              "type": "uint8"
          },
          {
              "internalType": "uint256",
              "name": "_minPrice",
              "type": "uint256"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "anonymous": false,
      "inputs":
      [
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "blockTime",
              "type": "uint256"
          }
      ],
      "name": "NodeCreated",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs":
      [
          {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
          }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs":
      [
          {
              "indexed": false,
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "Paused",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs":
      [
          {
              "indexed": false,
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "Unpaused",
      "type": "event"
  },
  {
      "inputs":
      [
          {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
          }
      ],
      "name": "burn",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "cashoutAllNodesRewards",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "_creationTime",
              "type": "uint256"
          }
      ],
      "name": "cashoutNodeReward",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "_creationTime",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "rewardAmount_",
              "type": "uint256"
          }
      ],
      "name": "compoundNodeReward",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          },
          {
              "internalType": "string",
              "name": "nodeName",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "amount_",
              "type": "uint256"
          }
      ],
      "name": "createNode",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "getAllNodes",
      "outputs":
      [
          {
              "components":
              [
                  {
                      "internalType": "string",
                      "name": "name",
                      "type": "string"
                  },
                  {
                      "internalType": "uint256",
                      "name": "creationTime",
                      "type": "uint256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "lastClaimTime",
                      "type": "uint256"
                  },
                  {
                      "internalType": "uint256",
                      "name": "amount",
                      "type": "uint256"
                  }
              ],
              "internalType": "struct NodeManager.NodeEntity[]",
              "name": "",
              "type": "tuple[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "getAllNodesRewards",
      "outputs":
      [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "getIndexOfKey",
      "outputs":
      [
          {
              "internalType": "int256",
              "name": "",
              "type": "int256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs":
      [],
      "name": "getMinPrice",
      "outputs":
      [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "getNodeNumberOf",
      "outputs":
      [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "_creationTime",
              "type": "uint256"
          }
      ],
      "name": "getNodeReward",
      "outputs":
      [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "getNodesCreationTime",
      "outputs":
      [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "getNodesLastClaimTime",
      "outputs":
      [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "getNodesNames",
      "outputs":
      [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "isNodeOwner",
      "outputs":
      [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs":
      [],
      "name": "minPrice",
      "outputs":
      [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs":
      [],
      "name": "owner",
      "outputs":
      [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs":
      [],
      "name": "paused",
      "outputs":
      [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs":
      [],
      "name": "renounceOwnership",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [],
      "name": "rewardPerNode",
      "outputs":
      [
          {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs":
      [],
      "name": "token",
      "outputs":
      [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs":
      [],
      "name": "totalClaimed",
      "outputs":
      [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs":
      [],
      "name": "totalNodesCreated",
      "outputs":
      [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs":
      [],
      "name": "totalStaked",
      "outputs":
      [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
          }
      ],
      "name": "transferOwnership",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "uint8[]",
              "name": "newVal",
              "type": "uint8[]"
          }
      ],
      "name": "updateBoostMultipliers",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "uint8[]",
              "name": "newVal",
              "type": "uint8[]"
          }
      ],
      "name": "updateBoostRequiredDays",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "uint256",
              "name": "newVal",
              "type": "uint256"
          }
      ],
      "name": "updateMinPrice",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "uint8",
              "name": "newVal",
              "type": "uint8"
          }
      ],
      "name": "updateReward",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "address",
              "name": "newToken",
              "type": "address"
          }
      ],
      "name": "updateToken",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  }
];

export default abi;
