import React from 'react';

import AscendAmsContract from '../ContractsApi/AscendAmsContract';
import AscendPlatinumContract from '../ContractsApi/AscendPlatinumContract';
import AscendInfiniteContract from '../ContractsApi/AscendInfiniteContract';
import AscendMetaContract from '../ContractsApi/AscendMetaContract';
import CombContract from '../ContractsApi/CombContract';
import LouvertureContract from '../ContractsApi/LouvertureContract';
import NebulaContract from '../ContractsApi/NebulaContract';
import PentagonContract from '../ContractsApi/PentagonContract';
import PowerSolarContract from '../ContractsApi/PowerSolarContract';
import PowerHydroContract from '../ContractsApi/PowerHydroContract';
import PowerWindContract from '../ContractsApi/PowerWindContract';
import PowerNuclearContract from '../ContractsApi/PowerNuclearContract';
import RndDistrictsContract from '../ContractsApi/RndDistrictsContract';
import RndMansionsContract from '../ContractsApi/RndMansionsContract';
import StrongEthContract from '../ContractsApi/StrongEthContract';
import StrongMaticContract from '../ContractsApi/StrongMatic';
import ThorFreyaContract from '../ContractsApi/ThorFreyaContract';
import ThorHeimdallContract from '../ContractsApi/ThorHeimdallContract';
import ThorOdinContract from '../ContractsApi/ThorOdinContract';
import ThorThorContract from '../ContractsApi/ThorThorContract';
import UniverseContract from '../ContractsApi/UniverseContract';
import VaporContract from '../ContractsApi/VaporContract';
import NetworkTableRow from './NetworkTableRow';

const AvalancheContracts = (props) => {
  return (
    <>
      <NetworkTableRow contract={new AscendAmsContract(props.provider, props.addresses)} {...props} />
      <NetworkTableRow contract={new AscendPlatinumContract(props.provider, props.addresses)} {...props} />
      <NetworkTableRow contract={new AscendInfiniteContract(props.provider, props.addresses)} {...props} />
      <NetworkTableRow contract={new AscendMetaContract(props.provider, props.addresses)} {...props} />
      <NetworkTableRow contract={new LouvertureContract(props.provider, props.addresses)} {...props} />
      <NetworkTableRow contract={new NebulaContract(props.provider, props.addresses)} {...props} />
      <NetworkTableRow contract={new RndMansionsContract(props.provider, props.addresses)} {...props} />
      <NetworkTableRow contract={new RndDistrictsContract(props.provider, props.addresses)} {...props} />
      <NetworkTableRow contract={new ThorHeimdallContract(props.provider, props.addresses)} {...props} />
      <NetworkTableRow contract={new ThorFreyaContract(props.provider, props.addresses)} {...props} />
      <NetworkTableRow contract={new ThorThorContract(props.provider, props.addresses)} {...props} />
      <NetworkTableRow contract={new ThorOdinContract(props.provider, props.addresses)} {...props} />
      <NetworkTableRow contract={new UniverseContract(props.provider, props.addresses)} {...props} />
      <NetworkTableRow contract={new VaporContract(props.provider, props.addresses)} {...props} />
    </>
  );
};

const EthereumContracts = (props) => {
  return (
    <>
      <NetworkTableRow contract={new StrongEthContract(props.provider, props.addresses)} {...props} />
      <NetworkTableRow contract={new StrongMaticContract(props.provider, props.addresses)} {...props} />
    </>
  );
}

const FantomContracts = (props) => {
  return (
    <>
      <NetworkTableRow contract={new CombContract(props.provider, props.addresses)} {...props} />
      <NetworkTableRow contract={new PowerSolarContract(props.provider, props.addresses)} {...props} />
      <NetworkTableRow contract={new PowerWindContract(props.provider, props.addresses)} {...props} />
      <NetworkTableRow contract={new PowerHydroContract(props.provider, props.addresses)} {...props} />
      <NetworkTableRow contract={new PowerNuclearContract(props.provider, props.addresses)} {...props} />
    </>
  );
}

const PolygonContracts = (props) => {
  return (
    <>
      <NetworkTableRow contract={new PentagonContract(props.provider, props.addresses)} {...props} />
    </>
  );
}

const NetworkTableRows = (props) => {
  if (props.networkName === 'Avalanche') {
    return (<AvalancheContracts {...props} />);
  } else if (props.networkName === 'Ethereum') {
    return (<EthereumContracts {...props} />);
  } else if (props.networkName === 'Fantom') {
    return (<FantomContracts {...props} />);
  }else if (props.networkName === 'Polygon') {
    return (<PolygonContracts {...props} />);
  }
  return null;
};

export default NetworkTableRows;