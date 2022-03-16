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
import StrongEthContract from './ContractsApi/StrongEthContract';
import StrongMaticContract from './ContractsApi/StrongMatic';
import ThorFreyaContract from './ContractsApi/ThorFreyaContract';
import ThorHeimdallContract from './ContractsApi/ThorHeimdallContract';
import ThorOdinContract from './ContractsApi/ThorOdinContract';
import ThorThorContract from './ContractsApi/ThorThorContract';
import UniverseContract from './ContractsApi/UniverseContract';
import VaporContract from './ContractsApi/VaporContract';
import { setNetwork } from './Utils/Networking';
import NetworkTableRow from './NetworkTableRow';
import CombContract from './ContractsApi/CombContract';

const AvalancheContracts = (props) => {
  const provider = props.provider;
  const addresses = props.addresses;
  const isConnected = props.isConnected;

  return (
    <>
      <NetworkTableRow contract={new AscendAmsContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
      <NetworkTableRow contract={new AscendPlatinumContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
      <NetworkTableRow contract={new AscendInfiniteContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
      <NetworkTableRow contract={new AscendMetaContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
      <NetworkTableRow contract={new LouvertureContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
      <NetworkTableRow contract={new NebulaContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
      <NetworkTableRow contract={new RndMansionsContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
      <NetworkTableRow contract={new RndDistrictsContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
      <NetworkTableRow contract={new ThorHeimdallContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
      <NetworkTableRow contract={new ThorFreyaContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
      <NetworkTableRow contract={new ThorThorContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
      <NetworkTableRow contract={new ThorOdinContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
      <NetworkTableRow contract={new UniverseContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
      <NetworkTableRow contract={new VaporContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
    </>
  );
};

const EthereumContracts = (props) => {
  const provider = props.provider;
  const addresses = props.addresses;
  const isConnected = props.isConnected;

  return (
    <>
      <NetworkTableRow contract={new StrongEthContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
      <NetworkTableRow contract={new StrongMaticContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
    </>
  );
}

const FantomContracts = (props) => {
  const provider = props.provider;
  const addresses = props.addresses;
  const isConnected = props.isConnected;

  return (
    <>
      <NetworkTableRow contract={new CombContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
      <NetworkTableRow contract={new PowerSolarContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
      <NetworkTableRow contract={new PowerWindContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
      <NetworkTableRow contract={new PowerHydroContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
      <NetworkTableRow contract={new PowerNuclearContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
    </>
  );
}

const PolygonContracts = (props) => {
  const provider = props.provider;
  const addresses = props.addresses;
  const isConnected = props.isConnected;

  return (
    <>
      <NetworkTableRow contract={new PentagonContract(provider, addresses)} provider={provider} isWeb3={isConnected} />
    </>
  );
}


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

const Contracts = (props) => {
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

const NetworkTable = (props) => {
  const provider = props.provider;
  const networkName = props.networkName;
  const isWeb3 = provider.ethers.web3 ? true : false;
  const isConnected = isWeb3 && provider.networkName === networkName;
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
  const addresses = props.walletAddresses;
  const contracts = <Contracts networkName={networkName} addresses={addresses} isConnected={isConnected} provider={provider}/>
  return (
    <Container>
      <TableHeader networkName={networkName} isWeb3={isWeb3} provider={provider} />
      <Table borderless dark hover responsive striped>
        <thead>
          <tr key='summary-headers'>
            {tableHeaders}
          </tr>
        </thead>
        <tbody>
          {contracts}
        </tbody>
      </Table>
    </Container>
  );
};

export default NetworkTable;