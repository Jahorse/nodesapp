const abi = [
  {
		"inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
		"name": "_getNodesLastClaimTime",
		"outputs":
      [{ "internalType": "string", "name": "", "type": "string" }],
		"stateMutability": "view",
		"type": "function"
  },
  {
		"inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
		"name": "_getNodesNames",
		"outputs":
      [{ "internalType": "string", "name": "", "type": "string" }],
		"stateMutability": "view",
		"type": "function"
  },
  {
		"inputs": [
			{ "internalType": "address", "name": "account", "type": "address" },
			{ "internalType": "uint256", "name": "creationTime", "type": "uint256" },
		],
		"name": "_getNodeRewardAmountOf",
		"outputs":
			[{ "internalType": "uint256", "name": "", "type": "uint256" }],
		"stateMutability": "view",
		"type": "function"
  },
  {
		"inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
		"name": "_getRewardAmountOf",
		"outputs":
			[{ "internalType": "uint256", "name": "", "type": "uint256" }],
		"stateMutability": "view",
		"type": "function"
  },
  {
		"inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
		"name": "_getNodesCreationTime",
		"outputs":
			[{ "internalType": "string", "name": "", "type": "string" }],
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
];

export default abi;
