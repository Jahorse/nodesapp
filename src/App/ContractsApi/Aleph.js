import * as ethers from 'ethers';

import abi from './abi/aleph';
import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

const toAlephUnits = (weiAleph) => Number(ethers.utils.formatEther(weiAleph));
const fromAlephUnits = (aleph) => ethers.utils.parseEther(String(aleph));

const boostTierConfig = [
  {
    tier: 1,
    boost: 30,
  },
  {
    tier: 2,
    boost: 15,
  },
  {
    tier: 3,
    boost: 5,
  },
]

// This just assumes that the tier's position in the array is the GUID - 1
const nftGuidToBoostType = (nftGuid) => boostTierConfig(nftGuid - 1);

const nodeTypeConfig = [{
  nodeType: 1,
  yieldPercent: 1,
  price: ethers.utils.parseEther("10"),
  rewards: ethers.utils.parseEther("0.000001157"),
  programs: [{
      programId: 1e3,
      duration: 0,
      rewards: ethers.utils.parseEther("0"),
      boost: 0
  }, {
      programId: 1001,
      duration: 2592e3,
      rewards: ethers.utils.parseEther("0"),
      boost: 0
  }, {
      programId: 1002,
      duration: 5184e3,
      rewards: ethers.utils.parseEther("0"),
      boost: 0
  }, {
      programId: 1003,
      duration: 0,
      rewards: ethers.utils.parseEther("0"),
      boost: 0
  }, {
      programId: 3,
      duration: 1209600,
      rewards: ethers.utils.parseEther("0.07"),
      boost: .05
  }, {
      programId: 4,
      duration: 2419200,
      rewards: ethers.utils.parseEther("0.252"),
      boost: .09
  }, {
      programId: 5,
      duration: 4838400,
      rewards: ethers.utils.parseEther("0.84"),
      boost: .15
  }]
  }, {
    nodeType: 11,
    yieldPercent: .86,
    price: fromAlephUnits("1"),
    rewards: fromAlephUnits("0.0086").div(86400),
    programs: [{
        programId: 3,
        duration: 1209600,
        rewards: fromAlephUnits(.0086 * .05 * 14),
        boost: .05
    }, {
        programId: 4,
        duration: 2419200,
        rewards: fromAlephUnits(774e-6 * 28),
        boost: .09
    }, {
        programId: 5,
        duration: 4838400,
        rewards: fromAlephUnits(.07224),
        boost: .15
    }]
  }, {
    nodeType: 12,
    yieldPercent: .87,
    price: fromAlephUnits("2"),
    rewards: fromAlephUnits("0.0174").div(86400),
    programs: [{
        programId: 3,
        duration: 1209600,
        rewards: fromAlephUnits(0.01218),
        boost: .05
    }, {
        programId: 4,
        duration: 2419200,
        rewards: fromAlephUnits(0.043848),
        boost: .09
    }, {
        programId: 5,
        duration: 4838400,
        rewards: fromAlephUnits(0.00261 * 56),
        boost: .15
    }]
  }, {
    nodeType: 13,
    yieldPercent: .88,
    price: fromAlephUnits("3"),
    rewards: fromAlephUnits("0.0264").div(86400),
    programs: [{
        programId: 3,
        duration: 1209600,
        rewards: fromAlephUnits(0.01848),
        boost: .05
    }, {
        programId: 4,
        duration: 2419200,
        rewards: fromAlephUnits(0.066528),
        boost: .09
    }, {
        programId: 5,
        duration: 4838400,
        rewards: fromAlephUnits(0.22176),
        boost: .15
    }]
  }, {
    nodeType: 14,
    yieldPercent: .89,
    price: fromAlephUnits("4"),
    rewards: fromAlephUnits("0.0356").div(86400),
    programs: [{
        programId: 3,
        duration: 1209600,
        rewards: fromAlephUnits(0.02492),
        boost: .05
    }, {
        programId: 4,
        duration: 2419200,
        rewards: fromAlephUnits(0.089712),
        boost: .09
    }, {
        programId: 5,
        duration: 4838400,
        rewards: fromAlephUnits(0.00534 * 56),
        boost: .15
    }]
  }, {
    nodeType: 15,
    yieldPercent: .9,
    price: fromAlephUnits("5"),
    rewards: fromAlephUnits("0.045").div(86400),
    programs: [{
        programId: 3,
        duration: 1209600,
        rewards: fromAlephUnits(0.0315),
        boost: .05
    }, {
        programId: 4,
        duration: 2419200,
        rewards: fromAlephUnits(0.1134),
        boost: .09
    }, {
        programId: 5,
        duration: 4838400,
        rewards: fromAlephUnits(0.378),
        boost: .15
    }]
  }];

function parseRawInvestment(investment) {
	const rawInvestment = {
		nodeTotal: investment.nodeTotal.toNumber(),
		timestamp: investment.timestamp.toNumber(),
		unclaimed: toAlephUnits(investment.unclaimed),
		nftBoost: {
			timestamp: investment.nftBoost.timestamp.toNumber(),
			nftGuid: investment.nftBoost.nftGuid.toNumber(),
		},
		records: investment.records.map((record) => ({
			nodeType: record.nodeType.toNumber(),
			openedAsset: {
				nodeIds: record.openedAsset.nodeIds.map((id) => id.toNumber()),
			},
			lockedAssets: record.lockedAssets.map((lockedAsset) => ({
				timestamp: lockedAsset.timestamp.toNumber(),
				programId: lockedAsset.programId.toNumber(),
				nodeIds: lockedAsset.nodeIds.map((id) => id.toNumber()),
			})),
		})),
	};

	return rawInvestment;
}

class Aleph extends Contract {
  metadata = {
    name: 'Aleph',
    symbol: 'nALEPH',
    networkName: 'Avalanche',
    decimals: 2,
    claimSupport: true,
    hasCompound: false,
    appLink: 'https://app.aleph.finance/',
    chartLink: 'https://dexscreener.com/avalanche/0xa2c679baaaee979ab1fab18771ef2664800652fb',
    swapLink: 'https://swap.aleph.finance/',
  };
  contractAddress = '0xA526E7439D63704B6f1AD83B26984DafB84e4Df6';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Avalanche');

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceCg('aleph-finance');
  }

  async compoundAll() {
    console.error('AlephContract has no compoundAll().');
    return null;
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling AlephContract.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    return contract.claimRewards(Number.MAX_SAFE_INTEGER);
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);
    const currentBlock = await this.jsonRpcProvider.getBlockNumber();
    const currentTimestamp = await this.jsonRpcProvider.getBlock(currentBlock).then(b => b.timestamp);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const rawNodes = await contract.getInvestment(walletAddress);
        const parsedNodes = (parseRawInvestment(rawNodes));

        let nftBoost = 1;
        const stakeTimestamp = parsedNodes.nftBoost.timestamp;
        const totalDuration = currentTimestamp - parsedNodes.timestamp;

        if (stakeTimestamp > 0 && totalDuration > 0) {
            const boostType = nftGuidToBoostType(parsedNodes.nftBoost.nftGuid);
            nftBoost += boostType.boost / 100;
            const stakeDuration = Math.min(currentTimestamp - stakeTimestamp, totalDuration);
            const n = stakeDuration * boostType.boost;
            const d = totalDuration * 100;

            nftBoost = (n + d) / d;
        }

        let rewards = parsedNodes.unclaimed;

        for (const record of parsedNodes.records) {
          const nodeConfig = nodeTypeConfig.find((item) => item.nodeType === record.nodeType);

          // calculate base rewards for open nodes.
          const baseRewardPerNodePerSecond = toAlephUnits(nodeConfig.rewards);
          const rewardsPerOpenNode = baseRewardPerNodePerSecond * totalDuration * nftBoost;

          rewards += rewardsPerOpenNode * record.openedAsset.nodeIds.length;

          for (const lockedAsset of record.lockedAssets) {
              const program = nodeConfig.programs.find((p) => p.programId === lockedAsset.programId);

              // check if lockup period ended
              const timeDelta = currentTimestamp - (lockedAsset.timestamp + program.duration);
              if (timeDelta > 0) {
                  rewards += toAlephUnits(nodeConfig.rewards.mul(timeDelta).add(program.rewards)) * lockedAsset.nodeIds.length;
              }
          }
        }
        nodes.push({
          nextProcessingTime: Date.now(),
          rewards,
        });
      } catch (e) {
        if (!e.reason.includes('NO NODE OWNER')) {
          console.log('ERR', e);
        }
      }
    }

    return nodes;
  }
}

export default Aleph;
