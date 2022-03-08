export const claimAbi = [ 'function cashoutAll()' ];

export const nodeQueryAbi = [
  {
      "inputs":
      [],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "anonymous": false,
      "inputs":
      [
          {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "name",
              "type": "string"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "totalNodesCreated",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "_type",
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
              "name": "index",
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
              "internalType": "uint256",
              "name": "newInterval",
              "type": "uint256"
          }
      ],
      "name": "_changeClaimInterval",
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
              "name": "newnodePriceLesser",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "newnodePriceCommon",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "newnodePriceLegendary",
              "type": "uint256"
          }
      ],
      "name": "_changeNodePrice",
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
              "name": "newPriceLesser",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "newPriceCommon",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "newPriceLegendary",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "newPriceOMEGA",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "newPriceLesserStake",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "newPriceCommonStake",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "newPriceLegendaryStake",
              "type": "uint256"
          }
      ],
      "name": "_changeRewardsPerMinute",
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
              "name": "amount",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_type",
              "type": "uint256"
          },
          {
              "internalType": "bool",
              "name": "isFusion",
              "type": "bool"
          }
      ],
      "name": "_compoundForNode",
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
      [],
      "name": "_getFusionCost",
      "outputs":
      [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
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
      "name": "_getNodeCounts",
      "outputs":
      [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
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
      [],
      "name": "_getNodePrices",
      "outputs":
      [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
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
      "name": "_getNodesExpireTime",
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
      "name": "_getNodesInfo",
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
      "name": "_getNodesName",
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
      "name": "_getNodesType",
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
              "name": "index",
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
      [],
      "name": "_getTaxForFusion",
      "outputs":
      [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
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
              "name": "",
              "type": "address"
          }
      ],
      "name": "_managers",
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
              "internalType": "address",
              "name": "manager",
              "type": "address"
          }
      ],
      "name": "addManager",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [],
      "name": "allowFusion",
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
      "name": "allowMigrate",
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
      "name": "claimInterval",
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
              "name": "",
              "type": "address"
          }
      ],
      "name": "commonNodes",
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
              "name": "",
              "type": "address"
          }
      ],
      "name": "commonNodesStake",
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
              "internalType": "string",
              "name": "name",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "expireTime",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_type",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_isStake",
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
              "internalType": "uint256",
              "name": "_method",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "fusionNode",
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
              "name": "_type",
              "type": "uint256"
          },
          {
              "internalType": "bool",
              "name": "isFusion",
              "type": "bool"
          }
      ],
      "name": "getNodePrice",
      "outputs":
      [
          {
              "internalType": "uint256",
              "name": "returnValue",
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
              "internalType": "string",
              "name": "name",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "_type",
              "type": "uint256"
          }
      ],
      "name": "giftNode",
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
              "name": "",
              "type": "address"
          }
      ],
      "name": "legendaryNodes",
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
              "name": "",
              "type": "address"
          }
      ],
      "name": "legendaryNodesStake",
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
              "name": "",
              "type": "address"
          }
      ],
      "name": "lesserNodes",
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
              "name": "",
              "type": "address"
          }
      ],
      "name": "lesserNodesStake",
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
              "name": "_account",
              "type": "address"
          },
          {
              "internalType": "string",
              "name": "_name",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "_creationTime",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_lastClaimTime",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_expireTime",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_type",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_isStake",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_rewardedAmount",
              "type": "uint256"
          }
      ],
      "name": "migrateNode",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [],
      "name": "nodeCountForCommon",
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
      "name": "nodeCountForLegendary",
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
      "name": "nodeCountForLesser",
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
      "name": "nodeLimit",
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
      "name": "nodePriceCommon",
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
      "name": "nodePriceLegendary",
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
      "name": "nodePriceLesser",
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
              "name": "",
              "type": "address"
          }
      ],
      "name": "omegaOwner",
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
      [
          {
              "internalType": "address",
              "name": "manager",
              "type": "address"
          }
      ],
      "name": "removeManager",
      "outputs":
      [],
      "stateMutability": "nonpayable",
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
      "name": "rewardPerMinuteCommon",
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
      "name": "rewardPerMinuteCommonStake",
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
      "name": "rewardPerMinuteLegendary",
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
      "name": "rewardPerMinuteLegendaryStake",
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
      "name": "rewardPerMinuteLesser",
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
      "name": "rewardPerMinuteLesserStake",
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
      "name": "rewardsPerMinuteOMEGA",
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
              "name": "_nodeCountForLesser",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_nodeCountForCommon",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_nodeCountForLegendary",
              "type": "uint256"
          }
      ],
      "name": "setNodeCountForFusion",
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
              "name": "_taxForLesser",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_taxForCommon",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_taxForLegendary",
              "type": "uint256"
          }
      ],
      "name": "setTaxForFusion",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [],
      "name": "taxForCommon",
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
      "name": "taxForLegendary",
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
      "name": "taxForLesser",
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
      "name": "toggleFusionMode",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs":
      [],
      "name": "toggleMigrateMode",
      "outputs":
      [],
      "stateMutability": "nonpayable",
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
              "internalType": "uint256",
              "name": "newValue",
              "type": "uint256"
          }
      ],
      "name": "updateNodeLimit",
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
              "name": "index",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "nodeType",
              "type": "uint256"
          }
      ],
      "name": "withdrawAmount",
      "outputs":
      [],
      "stateMutability": "nonpayable",
      "type": "function"
  }
];
