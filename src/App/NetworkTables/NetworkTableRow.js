import React, { useEffect, useState } from 'react';
import { FaChartLine } from 'react-icons/fa';
import { MdOutlineChangeCircle } from 'react-icons/md';
import { Button } from 'reactstrap';

import { breakpoint, useViewport } from '../Utils/Hooks';

const dhm = (t) => {
  var cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000,
      d = Math.floor(t / cd),
      h = Math.floor( (t - d * cd) / ch),
      m = Math.round( (t - d * cd - h * ch) / 60000),
      pad = function(n){ return n < 10 ? '0' + n : n; };
  if( m === 60 ){
    h++;
    m = 0;
  }
  if( h === 24 ){
    d++;
    h = 0;
  }
  return [d, pad(h), pad(m)].join(':');
}

const claimAll = (props) => {
  const timeUntilClaim = props.timeUntilClaim;
  const contract = props.contract;
  const contractName = contract.metadata.name;
  const isConnected = props.isConnected;
  const signer = props.signer;

  let claimAll;
  if (timeUntilClaim > 0) {
    claimAll = <Button color='primary' disabled>{dhm(timeUntilClaim)}</Button>;
  } else if (contract.metadata.claimSupport && isConnected) {
    claimAll = <Button color='primary' onClick={() => contract.claimAll(signer)}>Claim All</Button>;
  } else {
    claimAll = <a href={contract.metadata.appLink}><Button color='primary'>Go to App</Button></a>;
  }
  return (<td key={`${contractName}-claimAll`}>{claimAll}</td>);
}

const compoundAll = (props) => {
  const timeUntilClaim = props.timeUntilClaim;
  const contract = props.contract;
  const contractName = contract.metadata.name;
  const isConnected = props.isConnected;
  const signer = props.signer;

  if (isConnected) {
    let compoundAll;
    if (contract.metadata.hasCompound) {
      if (timeUntilClaim > 0) {
        compoundAll = <Button color='primary' disabled>{dhm(timeUntilClaim)}</Button>;
      } else if (contract.metadata.claimSupport) {
        compoundAll = <Button color='primary' onClick={() => contract.compoundAll(signer)}>Compound All</Button>;
      } else {
        compoundAll = <a href={contract.metadata.appLink}><Button color='primary'>Go to App</Button></a>;
      }
    }
    return (<td key={`${contractName}-compoundAll`}>{compoundAll}</td>);
  }
}

const claimApp = (props) => {
  const timeUntilClaim = props.timeUntilClaim;
  const contract = props.contract;
  const contractName = contract.metadata.name;

  let claimAll;
  if (timeUntilClaim > 0) {
    claimAll = <Button color='primary' disabled>{dhm(timeUntilClaim)}</Button>;
  } else {
    claimAll = <a href={contract.metadata.appLink}><Button color='primary'>Go to App</Button></a>;
  }
  return (<td key={`${contractName}-claim-compound`}>{claimAll}</td>);
}

const tableColumnToContentMap = {
  claim: (props) => claimAll(props),
  compound: (props) => compoundAll(props),
  claimCompound: (props) => claimApp(props),
  tokenPrice: (n, p) => (
    <td key={`${n}-price`}>
      {p ? `$${p}` : ''}
    </td>
  ),
  rewardsToken: (n, r, s) => (
    <td key={`${n}-rewards-token`}>
      {r} {s}
    </td>
  ),
  rewardsUsd: (name, price, rewards, pad = 5) => (
    <td key={`${name}-rewards-usd`} style={{textAlign: 'right', paddingRight: `${pad}rem`}}>
      {price ? `$${parseFloat(price * rewards).toFixed(2)}` : null}
    </td>
  ),
  serviceName: (name, appLink, chartLink, swapLink, pad) => (
    <th key={`${name}-name`} scope="row">
      <a href={appLink} className='link-dark' style={{textDecoration: 'none'}}>{name}</a><br />
      <a href={chartLink} className='link-dark' style={{textDecoration: 'none'}}><FaChartLine /></a>
      <span style={{paddingLeft: `${pad}rem`}}>
        <a href={swapLink} className='link-dark' style={{textDecoration: 'none', fontSize: '110%'}}><MdOutlineChangeCircle /></a>
      </span>
    </th>
  ),
  swap: (n, l) => (
    <td key={`${n}-swap`}>
      <a href={l}><Button color='primary'>Swap</Button></a>
    </td>
  ),
};

const NetworkTableRowChild = (props) => {
  const [price, setPrice] = useState();
  const { width } = useViewport();
  const contract = props.contract;
  const contractName = props.contract.metadata.name;

  useEffect(() => {
    const getPrice = async () => {
      setPrice(await contract.getPriceUsd());
    };
    getPrice();
  }, [contract]);

  const rewards = parseFloat(contract.getTotalRewards(props.nodeInfo, true));
  const timeUntilClaim = contract.timeUntilClaim();

  const columns = [];
  for (const column of props.columns) {
    switch (column) {
      case 'claim':
        columns.push(tableColumnToContentMap.claim({timeUntilClaim, contract, contractName, isConnected: props.isConnected, signer: props.signer}));
        break;
      case 'claimCompound':
        columns.push(tableColumnToContentMap.claimCompound({timeUntilClaim, contract, contractName}));
        break;
      case 'compound':
        columns.push(tableColumnToContentMap.compound({timeUntilClaim, contract, contractName, isConnected: props.isConnected, signer: props.signer}));
        break;
      case 'serviceName':
        const namePad = width > breakpoint ? 1 : 0.5;
        columns.push(tableColumnToContentMap.serviceName(
          contractName,
          contract.metadata.appLink,
          contract.metadata.chartLink,
          contract.metadata.swapLink,
          namePad
        ));
        break;
      case 'rewardsToken':
        columns.push(tableColumnToContentMap.rewardsToken(contractName, rewards.toFixed(contract.metadata.decimals), contract.metadata.symbol));
        break;
      case 'rewardsUsd':
        const pad = width > breakpoint ? 5 : 1;
        columns.push(tableColumnToContentMap.rewardsUsd(contractName, price, rewards, pad));
        break;
      case 'tokenPrice':
        columns.push(tableColumnToContentMap.tokenPrice(contractName, price));
        break;
      case 'swap':
        columns.push(tableColumnToContentMap.swap(contractName, contract.metadata.swaplink));
        break;
      default:
        console.error(`Invalid column: ${column}`);
        break;
    }
  }

  return (<tr key={contractName}>{columns}</tr>);
}

const NetworkTableRow = (props) => {
  const [nodeInfo, updateNodeInfo] = useState();
  useEffect(() => {
    const getNodeData = async () => {
      updateNodeInfo(await props.contract.getNodes());
    }
    getNodeData();
  }, [props.contract]);
  return (nodeInfo && nodeInfo.length > 0)
    ? <NetworkTableRowChild
      key={props.contract.metadata.name}
      provider={props.provider}
      nodeInfo={nodeInfo}
      contract={props.contract}
      isConnected={props.isConnected}
      columns={props.columns}
    />
    : null;
}

export default NetworkTableRow;