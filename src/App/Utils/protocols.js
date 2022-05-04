
import AscendAms from '../ContractsApi/AscendAmsContract';
import AscendPlatinum from '../ContractsApi/AscendPlatinumContract';
import AscendInfinite from '../ContractsApi/AscendInfiniteContract';
import AscendMeta from '../ContractsApi/AscendMetaContract';
import Atlas from '../ContractsApi/AtlasContract';
import Comb from '../ContractsApi/CombContract';
import Cronodes from '../ContractsApi/CronodesContract';
import Dominium from '../ContractsApi/DominiumContract';
import Etherstones from '../ContractsApi/EtherstonesContract';
import Hive from '../ContractsApi/HiveContract';
import Louverture from '../ContractsApi/LouvertureContract';
import Nebula from '../ContractsApi/NebulaContract';
import Pentagon from '../ContractsApi/PentagonContract';
import Phoenix from '../ContractsApi/PhoenixContract';
import PowerSolar from '../ContractsApi/PowerSolarContract';
import PowerHydro from '../ContractsApi/PowerHydroContract';
import PowerWind from '../ContractsApi/PowerWindContract';
import PowerNuclear from '../ContractsApi/PowerNuclearContract';
import ProjectX from '../ContractsApi/ProjectXContract';
import RndDistricts from '../ContractsApi/RndDistrictsContract';
import RndMansions from '../ContractsApi/RndMansionsContract';
import Samurai from '../ContractsApi/SamuraiContract';
import StackOs from '../ContractsApi/StackOsContract';
import StrongEth from '../ContractsApi/StrongEthContract';
import StrongMatic from '../ContractsApi/StrongMaticContract';
import Tavern from '../ContractsApi/TavernContract';
import ThorFreya from '../ContractsApi/ThorFreyaContract';
import ThorHeimdall from '../ContractsApi/ThorHeimdallContract';
import ThorOdin from '../ContractsApi/ThorOdinContract';
import ThorThor from '../ContractsApi/ThorThorContract';
import Universe from '../ContractsApi/UniverseContract';
import Vapor from '../ContractsApi/VaporContract';

export class ProtocolProvider {
  constructor(contract) {
    this.contract = contract;
  }

  async hasNodes() {
    await this.contract.fetchPromise;
    return this.contract.nodes.length > 0;
  }
}

export const avalancheProtocols = new Map([
  ['AscendAms', AscendAms],
  ['AscendPlatinum', AscendPlatinum],
  ['AscendInfinite', AscendInfinite],
  ['AscendMeta', AscendMeta],
  ['Etherstones', Etherstones],
  ['Louverture', Louverture],
  ['Nebula', Nebula],
  ['Phoenix', Phoenix],
  ['ProjectX', ProjectX],
  ['RndMansions', RndMansions],
  ['RndDistricts', RndDistricts],
  ['Tavern', Tavern],
  ['ThorHeimdall', ThorHeimdall],
  ['ThorFreya', ThorFreya],
  ['ThorThor', ThorThor],
  ['ThorOdin', ThorOdin],
  // ['Universe', Universe],
  ['Vapor', Vapor],
]);
export const cronosProtocols = new Map([
  ['Cronodes', Cronodes],
]);
export const ethereumProtocols = new Map([
  ['StrongEth', StrongEth],
  ['StrongMatic', StrongMatic],
]);
export const fantomProtocols = new Map([
  ['Atlas', Atlas],
  ['Comb', Comb],
  ['PowerSolar', PowerSolar],
  ['PowerWind', PowerWind],
  ['PowerHydro', PowerHydro],
  ['PowerNuclear', PowerNuclear],
  ['Samurai', Samurai],
]);
export const polygonProtocols = new Map([
  ['Dominium', Dominium],
  ['Hive', Hive],
  ['Pentagon', Pentagon],
  ['StackOs', StackOs],
]);

export const getProtocolProviders = (protocolMap, provider, addresses, disabledList = []) => {
  const protocolProviders = {};
  protocolMap.forEach((p, n) => {
    if (!disabledList.includes(n)) {
      const protocolContractInterface = new p(provider, addresses);
      protocolProviders[n] = new ProtocolProvider(protocolContractInterface);
    }
  });
  return protocolProviders;
};
