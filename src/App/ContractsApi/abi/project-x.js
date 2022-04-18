const abi = [{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"nodes","outputs":[{"components":[{"internalType":"uint32","name":"id","type":"uint32"},{"internalType":"uint8","name":"tierIndex","type":"uint8"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint32","name":"createdTime","type":"uint32"},{"internalType":"uint32","name":"claimedTime","type":"uint32"},{"internalType":"uint32","name":"limitedTime","type":"uint32"},{"internalType":"uint256","name":"multiplier","type":"uint256"},{"internalType":"uint32","name":"leftover","type":"uint256"}],"internalType":"struct Node[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardsOfUser","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"tierName","type":"string"}],"name":"getTierByName","outputs":[{"components":[{"internalType":"uint8","name":"id","type":"uint32"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"rewardsPerTime","type":"uint256"},{"internalType":"uint32","name":"claimInterval","type":"uint32"},{"internalType":"uint256","name":"maintenanceFee","type":"uint256"}],"internalType":"struct Tier","name":"","type":"tuple"}],"stateMutability":"view","type":"function"}];

export default abi;