import React from 'react';
import {
  Button,
  Col,
  Container,
  Row,
  Table,
} from 'reactstrap';

import NetworkTableRows from './NetworkTableRows';
import { setNetwork } from '../Utils/Networking';
import { breakpoint, useViewport } from '../Utils/Hooks';

const ConnectNetworkButton = (props) => {
  if (props.networkName === props.provider.networkName) {
    return (<></>);
  }
  return (
    <>
      <Button color='secondary' className='m-2' onClick={() => setNetwork(props.provider.ethers.web3, props.networkName)} >Connect</Button>
    </>
  );
};

const TableTitle = (props) => {
  let connectButton;
  if (props.isWeb3) {
    connectButton = (
      <Col xs='2' lg='2' key={`connect-${props.networkName}`} className='d-flex justify-content-end'>
        <ConnectNetworkButton {...props} />
      </Col>
    );
  }
  return (
    <Container>
      <Row>
        <Col xs='8' lg='10' key={`networkName-${props.networkName}`} className='p-2'>
          <h3>{props.networkName}</h3>
        </Col>
        {connectButton}
      </Row>
    </Container>
  );
};

const tableColumnToHeaderMap = {
  claim: (<th key='header-claim'>Claim</th>),
  compound: (<th key='header-compound'>Compound</th>),
  claimCompound: (<th key='header-claim-compound'>Claim/Compound</th>),
  tokenPrice: (<th key='header-token-price'>Token Price</th>),
  rewardsToken: (<th key='header-rewards-token'>Rewards</th>),
  rewardsUsd: (<th key='header-rewards-usd'>Rewards USD</th>),
  serviceName: (<th key='header-service-name'>Service</th>),
  swap: (<th key='header-swap'>Swap</th>),
};

const TableHeaders = (props) => {
  const tableHeaders = [];
  props.columns.forEach(c => tableHeaders.push(tableColumnToHeaderMap[c]));

  return tableHeaders;
};

const NetworkTable = (props) => {
  const provider = props.provider;
  const networkName = props.networkName;
  const isWeb3 = provider.ethers.web3 ? true : false;
  const isConnected = isWeb3 && provider.networkName === networkName;
  const { width } = useViewport();

  const columns = ['serviceName'];
  if (width < breakpoint) {
    columns.push(
      'rewardsToken',
      'rewardsUsd',
    );
  } else {
    const claimColumns = isConnected
      ? ['claim', 'compound']
      : ['claimCompound'];
    columns.push(
      'tokenPrice',
      'rewardsToken',
      'rewardsUsd',
      ...claimColumns,
      'swap',
    );
  }

  const addresses = props.walletAddresses;
  return (
    <Container className='my-2 bg-info rounded'>
      <TableTitle networkName={networkName} isWeb3={isWeb3} provider={provider} />
      <Table borderless hover responsive striped>
        <thead>
          <tr key='summary-headers'>
            <TableHeaders columns={columns} />
          </tr>
        </thead>
        <tbody>
          <NetworkTableRows
            addresses={addresses}
            columns={columns}
            isConnected={isConnected}
            networkName={networkName}
            provider={provider}
          />
        </tbody>
      </Table>
    </Container>
  );
};

export default NetworkTable;