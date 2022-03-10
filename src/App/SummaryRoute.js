import React from 'react';
import { Container, Table } from 'reactstrap';

import SummaryRow from './SummaryRow';
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

const addAvalanche = (profile, provider) => {
  const addresses = profile.walletAddresses.avalanche;
  return (
    <>
      <SummaryRow contract={new LouvertureContract(provider, addresses)} provider= {provider} />
      <SummaryRow contract={new NebulaContract(provider, addresses)} provider= {provider} />
      <SummaryRow contract={new ThorHeimdallContract(provider, addresses)} provider= {provider} />
      <SummaryRow contract={new ThorFreyaContract(provider, addresses)} provider= {provider} />
      <SummaryRow contract={new ThorThorContract(provider, addresses)} provider= {provider} />
      <SummaryRow contract={new ThorOdinContract(provider, addresses)} provider= {provider} />
      <SummaryRow contract={new UniverseContract(provider, addresses)} provider= {provider} />
      <SummaryRow contract={new VaporContract(provider, addresses)} provider= {provider} />
    </>
  );
}

const addFantom = (profile, provider) => {
  const addresses = profile.walletAddresses.fantom;
  return (
    <>
      <SummaryRow contract={new PowerSolarContract(provider, addresses)} provider= {provider} />
      <SummaryRow contract={new PowerWindContract(provider, addresses)} provider= {provider} />
      <SummaryRow contract={new PowerHydroContract(provider, addresses)} provider= {provider} />
      <SummaryRow contract={new PowerNuclearContract(provider, addresses)} provider= {provider} />
    </>
  );
}

const addPolygon = (profile, provider) => {
  const addresses = profile.walletAddresses.polygon;
  return (
    <>
      <SummaryRow contract={new PentagonContract(provider, addresses)} provider= {provider} />
    </>
  );
}

const Summary = (props) => {
  const networks = selectNetworks(props.provider.ethers);

  return (
    <Container fluid>
      <Table borderless dark hover responsive striped>
        <thead>
          <tr>
            <th>Project</th>
            <th>Rewards</th>
            <th>Claim</th>
            <th>Compound</th>
          </tr>
        </thead>
        <tbody>
          {networks.includes('avalanche') ? addAvalanche(props.profile, props.provider) : null}
          {networks.includes('fantom') ? addFantom(props.profile, props.provider) : null}
          {networks.includes('polygon') ? addPolygon(props.profile, props.provider) : null}
        </tbody>
      </Table>
    </Container>
  );
}

export default Summary;
