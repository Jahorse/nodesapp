import React from 'react';
import {
  Button,
  Col,
  Container,
  Row,
  Table,
} from 'reactstrap';

import NetworkTableRow from './NetworkTableRow';
import { setNetwork } from '../Utils/networking';
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
      <Col xs='4' lg='2' key={`connect-${props.networkName}`} className='d-flex justify-content-end'>
        <ConnectNetworkButton {...props} />
      </Col>
    );
  }
  return (
    <Container>
      <Row>
        <Col xs='8' lg='10' key={`networkName-${props.networkName}`} className='p-2'>
          <h3>{props.networkName}: ${props.totalRewards}</h3>
        </Col>
        {connectButton}
      </Row>
    </Container>
  );
};

const ColumnHeader = (props) => {
  const { width } = useViewport();
  const pad = width > breakpoint ? 5 : 1;

  const tableColumnToHeaderMap = {
    claim: (<th key='header-claim'>Claim</th>),
    compound: (<th key='header-compound'>Compound</th>),
    claimCompound: (<th key='header-claim-compound'>Claim</th>),
    dueDate: (<th key='header-due-date'>Due Date</th>),
    tokenPrice: (<th key='header-token-price'>Token Price</th>),
    rewardsToken: (<th key='header-rewards-token'>Rewards</th>),
    rewardsUsd: (<th key='header-rewards-usd' style={{textAlign: 'right', paddingRight: `${pad}rem`}}>Rewards USD</th>),
    serviceName: (<th key='header-service-name'>Service</th>),
  };

  return tableColumnToHeaderMap[props.columnName];
}

const TableHeaders = (props) => {
  const tableHeaders = [];
  props.columns.forEach(c => tableHeaders.push(<ColumnHeader key={c} columnName={c} />));

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
      : [];
    columns.push(
      'tokenPrice',
      'rewardsToken',
      'rewardsUsd',
      'dueDate',
      ...claimColumns,
    );
  }

  const addresses = props.walletAddresses;
  const rows = [];
  for (const [protocolName, protocolProvider] of Object.entries(props.protocolProviders)) {
    rows.push(
      <NetworkTableRow
        key={protocolName}
        contract={protocolProvider.contract}
        addresses={addresses}
        columns={columns}
        isConnected={isConnected}
        networkName={networkName}
        provider={provider}
      />
    );
  }
  return (
    <Container className='my-2 bg-info rounded'>
      <TableTitle
        networkName={networkName}
        isWeb3={isWeb3}
        provider={provider}
        totalRewards={props.totalRewards}
      />
      <Table borderless hover responsive striped>
        <thead>
          <tr key='summary-headers'>
            <TableHeaders columns={columns} />
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </Container>
  );
};

export default NetworkTable;