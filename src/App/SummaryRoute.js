import React from 'react';
import {
  Button,
  Col,
  Container,
  Row,
  Table,
} from 'reactstrap';

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
import RndDistrictsContract from './ContractsApi/RndDistrictsContract';
import RndMansionsContract from './ContractsApi/RndMansionsContract';
import ThorFreyaContract from './ContractsApi/ThorFreyaContract';
import ThorHeimdallContract from './ContractsApi/ThorHeimdallContract';
import ThorOdinContract from './ContractsApi/ThorOdinContract';
import ThorThorContract from './ContractsApi/ThorThorContract';
import UniverseContract from './ContractsApi/UniverseContract';
import VaporContract from './ContractsApi/VaporContract';
import { setNetwork } from './Networking';
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

const ConnectNetworkButton = (props) => {
  if (props.networkName === props.provider.networkName) {
    return (<></>);
  }
  const button = <Button onClick={() => setNetwork(props.provider.ethers.web3, props.networkName)} className='bg-dark'>Connect</Button>;
  return (
    <>
      {button}
    </>
  );
}

const TableHeader = (props) => {
  let connectButton;
  if (props.isWeb3) {
    connectButton = (
      <Col xs='2' lg='2' key={`connect-${props.networkName}`} className='p-2 px-3 d-flex justify-content-end'>
        <ConnectNetworkButton {...props} />
      </Col>
    );
  }
  return (
    <Container className='bg-secondary rounded-top'>
      <Row>
        <Col xs='8' lg='10' key={`networkName-${props.networkName}`} className='text-light p-2 px-3'>
          <h3>{props.networkName}</h3>
        </Col>
        {connectButton}
      </Row>
    </Container>
  );
}

const addAvalanche = (profile, provider) => {
  const isWeb3 = provider.ethers.web3 ? true : false;
  const isConnected = isWeb3 && provider.networkName === 'Avalanche';
  const tableHeaders = [
    (<th key='header-project'>Project</th>),
    (<th key='header-price'>Token Price</th>),
    (<th key='header-rewards'>Rewards</th>),
    (<th key='header-usd'>Rewards USD</th>),
  ];
  if (isConnected) {
    tableHeaders.push(
      (<th key='header-claim'>Claim</th>),
      (<th key='header-compound'>Compound</th>)
      );
    }
  const addresses = profile.walletAddresses.avalanche;
  return (
    <Container>
      <TableHeader networkName='Avalanche' isWeb3={isWeb3} provider={provider} />
      <Table borderless dark hover responsive striped>
        <thead>
          <tr key='summary-headers'>
            {tableHeaders}
          </tr>
        </thead>
        <tbody>
        <SummaryRow contract={new AscendAmsContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        <SummaryRow contract={new AscendPlatinumContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        <SummaryRow contract={new AscendInfiniteContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        <SummaryRow contract={new AscendMetaContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        <SummaryRow contract={new LouvertureContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        <SummaryRow contract={new NebulaContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        <SummaryRow contract={new RndMansionsContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        <SummaryRow contract={new RndDistrictsContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        <SummaryRow contract={new ThorHeimdallContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        <SummaryRow contract={new ThorFreyaContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        <SummaryRow contract={new ThorThorContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        <SummaryRow contract={new ThorOdinContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        <SummaryRow contract={new UniverseContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        <SummaryRow contract={new VaporContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        </tbody>
      </Table>
    </Container>
  );
}

const addFantom = (profile, provider) => {
  const isWeb3 = provider.ethers.web3 ? true : false;
  const isConnected = isWeb3 && provider.networkName === 'Fantom';
  const tableHeaders = [
    (<th key='header-project'>Project</th>),
    (<th key='header-price'>Token Price</th>),
    (<th key='header-rewards'>Rewards</th>),
    (<th key='header-usd'>Rewards USD</th>),
  ];
  if (isConnected) {
    tableHeaders.push(
      (<th key='header-claim'>Claim</th>),
      (<th key='header-compound'>Compound</th>)
    );
  }
  const addresses = profile.walletAddresses.fantom;
  return (
    <Container>
      <TableHeader networkName='Fantom' isWeb3={isWeb3} provider={provider} />
      <Table borderless dark hover responsive striped>
        <thead>
          <tr key='summary-headers'>
            {tableHeaders}
          </tr>
        </thead>
        <tbody>
        <SummaryRow contract={new PowerSolarContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        <SummaryRow contract={new PowerWindContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        <SummaryRow contract={new PowerHydroContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        <SummaryRow contract={new PowerNuclearContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        </tbody>
      </Table>
    </Container>
  );
}

const addPolygon = (profile, provider) => {
  const isWeb3 = provider.ethers.web3 ? true : false;
  const isConnected = isWeb3 && provider.networkName === 'Polygon';
  const tableHeaders = [
    (<th key='header-project'>Project</th>),
    (<th key='header-price'>Token Price</th>),
    (<th key='header-rewards'>Rewards</th>),
    (<th key='header-usd'>Rewards USD</th>),
  ];
  if (isConnected) {
    tableHeaders.push(
      (<th key='header-claim'>Claim</th>),
      (<th key='header-compound'>Compound</th>)
    );
  }
  const addresses = profile.walletAddresses.polygon;
  return (
    <Container>
      <TableHeader networkName='Polygon' isWeb3={isWeb3} provider={provider} />
      <Table borderless dark hover responsive striped>
        <thead>
          <tr key='summary-headers'>
            {tableHeaders}
          </tr>
        </thead>
        <tbody>
        <SummaryRow contract={new PentagonContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
        </tbody>
      </Table>
    </Container>
  );
}

const Summary = (props) => {
  const networks = selectNetworks(props.provider.ethers);

  return (
    <Container fluid>
      {networks.includes('avalanche')
        ? addAvalanche(props.profile, props.provider)
        : null
      }
      {networks.includes('fantom')
        ? addFantom(props.profile, props.provider)
        : null
      }
      {networks.includes('polygon')
        ? addPolygon(props.profile, props.provider)
        : null
      }
    </Container>
  );
}

export default Summary;
