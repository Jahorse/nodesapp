import React from 'react';
import { Container, Table } from 'reactstrap';

import AscendAmsContract from './ContractsApi/AscendAmsContract';
import AscendPlatinumContract from './ContractsApi/AscendPlatinumContract';
import AscendInfiniteContract from './ContractsApi/AscendInfiniteContract';
import AscendMetaContract from './ContractsApi/AscendMetaContract';
import LouvertureContract from './ContractsApi/LouvertureContract';
import NebulaContract from './ContractsApi/NebulaContract';
import PentagonContract from './ContractsApi/PentagonContract';
import PowerSolarContract from './ContractsApi/PowerSolarContract';
import PowerHydroContract from './ContractsApi/PowerHydroContract';
import PowerWindContract from './ContractsApi/PowerWindContract';
import PowerNuclearContract from './ContractsApi/PowerNuclearContract';
import ThorFreyaContract from './ContractsApi/ThorFreyaContract';
import ThorHeimdallContract from './ContractsApi/ThorHeimdallContract';
import ThorOdinContract from './ContractsApi/ThorOdinContract';
import ThorThorContract from './ContractsApi/ThorThorContract';
import UniverseContract from './ContractsApi/UniverseContract';
import VaporContract from './ContractsApi/VaporContract';
import SummaryRow from './SummaryRow';

const selectNetworks = (providers) => {
  if (providers.web3) {
    return ['avalanche', 'fantom', 'polygon'];
  }
  const networks = [];
  if (providers.avalanche) { networks.push('avalanche'); }
  if (providers.fantom) { networks.push('fantom'); }
  if (providers.polygon) { networks.push('polygon'); }

  return networks;
};

const addAvalanche = (profile, provider, isWeb3) => {
  const addresses = profile.walletAddresses.avalanche;
  return (
    <>
      <SummaryRow contract={new AscendAmsContract(provider, addresses)} provider={provider} isWeb3={isWeb3} />
      <SummaryRow contract={new AscendPlatinumContract(provider, addresses)} provider={provider} isWeb3={isWeb3} />
      <SummaryRow contract={new AscendInfiniteContract(provider, addresses)} provider={provider} isWeb3={isWeb3} />
      <SummaryRow contract={new AscendMetaContract(provider, addresses)} provider={provider} isWeb3={isWeb3} />
      <SummaryRow contract={new LouvertureContract(provider, addresses)} provider={provider} isWeb3={isWeb3} />
      <SummaryRow contract={new NebulaContract(provider, addresses)} provider={provider} isWeb3={isWeb3} />
      <SummaryRow contract={new ThorHeimdallContract(provider, addresses)} provider={provider} isWeb3={isWeb3} />
      <SummaryRow contract={new ThorFreyaContract(provider, addresses)} provider={provider} isWeb3={isWeb3} />
      <SummaryRow contract={new ThorThorContract(provider, addresses)} provider={provider} isWeb3={isWeb3} />
      <SummaryRow contract={new ThorOdinContract(provider, addresses)} provider={provider} isWeb3={isWeb3} />
      <SummaryRow contract={new UniverseContract(provider, addresses)} provider={provider} isWeb3={isWeb3} />
      <SummaryRow contract={new VaporContract(provider, addresses)} provider={provider} isWeb3={isWeb3} />
    </>
  );
}

const addFantom = (profile, provider, isWeb3) => {
  const addresses = profile.walletAddresses.fantom;
  return (
    <>
      <SummaryRow contract={new PowerSolarContract(provider, addresses)} provider={provider} isWeb3={isWeb3} />
      <SummaryRow contract={new PowerWindContract(provider, addresses)} provider={provider} isWeb3={isWeb3} />
      <SummaryRow contract={new PowerHydroContract(provider, addresses)} provider={provider} isWeb3={isWeb3} />
      <SummaryRow contract={new PowerNuclearContract(provider, addresses)} provider={provider} isWeb3={isWeb3} />
    </>
  );
}

const addPolygon = (profile, provider, isWeb3) => {
  const addresses = profile.walletAddresses.polygon;
  return (
    <>
      <SummaryRow contract={new PentagonContract(provider, addresses)} provider={provider} isWeb3={isWeb3} />
    </>
  );
}

const Summary = (props) => {
  const networks = selectNetworks(props.provider.ethers);

  const isWeb3 = props.provider.ethers.web3 ? true : false;

  const tableHeaders = [
    (<th key='header-project'>Project</th>),
    (<th key='header-project'>Token Price</th>),
    (<th key='header-rewards'>Rewards</th>),
    (<th key='header-usd'>Rewards USD</th>),
  ];
  if (isWeb3) {
    tableHeaders.push(
      (<th key='header-claim'>Claim</th>),
      (<th key='header-compound'>Compound</th>)
    );
  }

  return (
    <Container fluid>
      <Table borderless dark hover responsive striped>
        <thead>
          <tr key='summary-headers'>
            {tableHeaders}
          </tr>
        </thead>
        <tbody>
          {networks.includes('avalanche') ? addAvalanche(props.profile, props.provider, isWeb3) : null}
          {networks.includes('fantom') ? addFantom(props.profile, props.provider, isWeb3) : null}
          {networks.includes('polygon') ? addPolygon(props.profile, props.provider, isWeb3) : null}
        </tbody>
      </Table>
    </Container>
  );
}

export default Summary;
