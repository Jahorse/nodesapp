import { ethers } from 'ethers';
import Contract from './Contract';

import abi from "./abi/universe.js";

class UniverseContract extends Contract {
  contractAddress = '0x89323f00a621D4eD6A56a93295C5f10f4df57FFa';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Avalanche');

    this.fetchPromise = this.fetchNodes().then(n => this.nodes = n);
  }

  hasCompound() { return true; }

  getName() { return 'Universe'; }

  getToken() { return 'UNIV'; }

  showDecimalPlaces() { return 2; }

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

  isClaimable(nodes) {
    for (const node of nodes) {
      if (node.nextProcessingTime < Date.now()) {
        return true;
      }
    }
    return false;
  }

  async compoundAll() {
    if (!this.signer) {
      console.error('Tried calling UniverseContract.compoundAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    return contract.compoundAll();
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling UniverseContract.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    return contract.cashoutAll();
  }

  async compound(planetId) {
    if (!this.signer) {
      console.error('Tried calling UniverseContract.compound() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    return contract.compoundReward(planetId);
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const address of this.walletAddresses) {
      try {
        const planetIds = await contract.getPlanetIdsOf(address);

        const rawPlanets = await contract.getPlanetsByIds(planetIds);

        for (const rawPlanet of rawPlanets) {
          const lastProcessingTime = new Date(rawPlanet['planet']['lastProcessingTimestamp'].toString() * 1000);
          const nextProcessingTime = new Date(lastProcessingTime);
          nextProcessingTime.setSeconds(parseInt(nextProcessingTime.getSeconds()) + parseInt(rawPlanet['compoundDelay']))

          const node = {
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
          };

          nodes.push(node);
        }

      } catch (e) {
        console.log('ERR', e);
      }
    }

    return nodes;
  }
}

export default UniverseContract;