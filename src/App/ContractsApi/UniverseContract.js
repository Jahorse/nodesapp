import { ethers } from 'ethers';
import { UniverseNode } from '../Models/UniverseNode.js';

import { abi } from "./abi/universe.js";

export class UniverseContract {
  contractAddress = '0x89323f00a621D4eD6A56a93295C5f10f4df57FFa';

  async compoundAll(signer) {
    const contract = new ethers.Contract(this.contractAddress, abi, signer);
    return contract.compoundAll();
  }

  async claimAll(signer) {
    const contract = new ethers.Contract(this.contractAddress, abi, signer);
    return contract.cashoutAll();
  }

  async compound(planetId, signer) {
    const contract = new ethers.Contract(this.contractAddress, abi, signer);
    return contract.compoundReward(planetId);
  }

  async getNodes(walletAddress, provider) {
    let nodes = [];
    const contract = new ethers.Contract(this.contractAddress, abi, provider);

    try {
      const planetIds = await contract.getPlanetIdsOf(walletAddress);

      const rawPlanets = await contract.getPlanetsByIds(planetIds);

      for (const rawPlanet of rawPlanets) {
        const lastProcessingTime = new Date(rawPlanet['planet']['lastProcessingTimestamp'].toString() * 1000);
        const nextProcessingTime = new Date(lastProcessingTime);
        nextProcessingTime.setSeconds(parseInt(nextProcessingTime.getSeconds()) + parseInt(rawPlanet['compoundDelay']))

        const node = new UniverseNode({
          // Standard fields
          name: rawPlanet['planet']['name'],
          creationTime: new Date(rawPlanet['planet']['creationTime'].toString() * 1000),
          lastProcessingTime,
          nextProcessingTime,
          amount: rawPlanet['planet']['planetValue'].toString() / 1e18,
          rewards: rawPlanet['pendingRewards'].toString() / 1e18,
          // Extra fields
          id: rawPlanet['id'].toString(),
          rewardMult: rawPlanet['planet']['rewardMult'].toString(),
          totalClaimed: rawPlanet['planet']['totalClaimed'].toString() / 1e18,
          rewardPerDay: rawPlanet['rewardPerDay'].toString() / 1e18,
          compoundDelay: rawPlanet['compoundDelay'].toString(),
        });

        nodes.push(node);
      }

      return nodes;
    } catch (e) {
      console.log('ERR', e);
    }

    return null;
  }

  getTotalRewards(planets, compounding) {
    let rewards = 0;
    for (const planet of planets) {
        rewards += parseFloat(planet['rewards']);
    }

    if (compounding) {
        rewards = rewards + (rewards * 0.1);
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
}

