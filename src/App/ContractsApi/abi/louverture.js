const abi = [
  {
      "inputs":
      [
          {
              "internalType": "uint256",
              "name": "_nodeMinPrice",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_rewardPerValue",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_claimTime",
              "type": "uint256"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
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
      "name": "_addAllNodeValue",
      "outputs":
      [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
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
      "name": "_addNodeValue",
      "outputs":
      [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
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
      "name": "_cashoutAllNodesReward",
      "outputs":
      [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
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
      "name": "_cashoutNodeReward",
      "outputs":
      [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "bool",
              "name": "newMode",
              "type": "bool"
          }
      ],
      "name": "_changeAutoDistri",
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
              "name": "newTime",
              "type": "uint256"
          }
      ],
      "name": "_changeClaimTime",
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
              "name": "newGasDistri",
              "type": "uint256"
          }
      ],
      "name": "_changeGasDistri",
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
              "name": "newNodeMinPrice",
              "type": "uint256"
          }
      ],
      "name": "_changeNodeMinPrice",
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
              "name": "newPrice",
              "type": "uint256"
          }
      ],
      "name": "_changeRewardPerValue",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [
          {
              "internalType": "uint256[]",
              "name": "newTierLevel",
              "type": "uint256[]"
          },
          {
              "internalType": "uint256[]",
              "name": "newTierSlope",
              "type": "uint256[]"
          }
      ],
      "name": "_changeTierSystem",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [],
      "name": "_distributeRewards",
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
      "name": "_getAddValueCountOf",
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
      "name": "_getNodeNumberOf",
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
              "name": "creationTime",
              "type": "uint256"
          }
      ],
      "name": "_getNodeRewardAmountOf",
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
              "name": "creationTime",
              "type": "uint256"
          }
      ],
      "name": "_getNodeValueAmountOf",
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
      "name": "_getNodeValueOf",
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
      "name": "_getNodeValueOf",
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
      "name": "_getNodesCreationTime",
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
      "name": "_getNodesLastClaimTime",
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
      "name": "_getNodesNames",
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
      "name": "_getNodesRewardAvailable",
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
      "name": "_getRewardAmountOf",
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
      "name": "_getRewardAmountOf",
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
              "name": "creationTime",
              "type": "uint256"
          }
      ],
      "name": "_getRewardMultAmountOf",
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
      "name": "_getRewardMultOf",
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
      "name": "_getRewardMultOf",
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
      "name": "_isNodeOwner",
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
      "name": "autoDistri",
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
      [
          {
              "internalType": "uint256",
              "name": "_creationTime",
              "type": "uint256"
          },
          {
              "internalType": "string",
              "name": "newName",
              "type": "string"
          }
      ],
      "name": "changeNodeName",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [],
      "name": "claimTime",
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
              "internalType": "address[]",
              "name": "accounts",
              "type": "address[]"
          },
          {
              "internalType": "string[]",
              "name": "nodeNames",
              "type": "string[]"
          },
          {
              "internalType": "uint256[]",
              "name": "_initValues",
              "type": "uint256[]"
          },
          {
              "internalType": "uint256[]",
              "name": "_multipliers",
              "type": "uint256[]"
          },
          {
              "internalType": "uint256[]",
              "name": "timeadd",
              "type": "uint256[]"
          }
      ],
      "name": "createBulkNode",
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
              "name": "_nodeInitialValue",
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
          },
          {
              "internalType": "string",
              "name": "nodeName",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "_nodeInitValue",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_multiplier",
              "type": "uint256"
          }
      ],
      "name": "createNodeManual",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [],
      "name": "distribution",
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
      "name": "gasForDistribution",
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
      "name": "gateKeeper",
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
      "name": "getTotalNodeValue",
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
      "name": "globalRewardAmount",
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
      "name": "lastDistributionCount",
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
      "name": "lastDistributionTime",
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
      "name": "lastIndexProcessed",
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
      "name": "nodeMinPrice",
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
      "name": "rewardPerValue",
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
              "name": "token_",
              "type": "address"
          }
      ],
      "name": "setToken",
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
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "tierLevel",
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
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "tierSlope",
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
      "name": "totalNodeValue",
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
      "name": "totalRewardStaked",
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
  }
];

export default abi;
