import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

function dhm(t){
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

const NetworkTableRowChild = (props) => {
  const [price, setPrice] = useState();
  const contract = props.contract;
  const contractName = props.contract.metadata.name;

  useEffect(() => {
    const getPrice = async () => {
      setPrice(await contract.getPriceUsd());
    };
    getPrice();
  }, [contract]);

  const rewards = parseFloat(contract.getTotalRewards(props.nodeInfo, true)).toFixed(contract.metadata.decimals);

  const columns = [
    (<th key={`${contractName}-name`} scope="row">{contractName}</th>),
    (<td key={`${contractName}-price`}>{price ? `$${price}` : null}</td>),
    (<td key={`${contractName}-rewards`}>
      {rewards} {contract.metadata.symbol}
    </td>),
    (<td key={`${contractName}-value`}>
      {price ? `$${parseFloat(price * parseFloat(contract.getTotalRewards(props.nodeInfo, true)).toFixed(contract.metadata.decimals)).toFixed(2)}` : null}
    </td>),
  ];

  const timeUntilClaim = contract.timeUntilClaim();

  let claimAll;
  if (timeUntilClaim > 0) {
    claimAll = <Button disabled>{dhm(timeUntilClaim)}</Button>;
  } else if (contract.metadata.claimSupport && props.isConnected) {
    claimAll = <Button onClick={() => contract.claimAll(props.signer)}>Claim All</Button>;
  } else {
    claimAll = <a href={contract.metadata.appLink}><Button>Go to App</Button></a>;
  }
  columns.push((<td key={`${contractName}-claimAll`}>{claimAll}</td>));

  if (props.isConnected) {
    let compoundAll;
    if (contract.metadata.hasCompound) {
      if (timeUntilClaim > 0) {
        compoundAll = <Button disabled>{dhm(timeUntilClaim)}</Button>;
      } else if (contract.metadata.claimSupport) {
        compoundAll = <Button onClick={() => contract.compoundAll(props.signer)}>Compound All</Button>;
      } else {
        compoundAll = <a href={contract.metadata.appLink}><Button>Go to App</Button></a>;
      }
    }
    columns.push((<td key={`${contractName}-compoundAll`}>{compoundAll}</td>));
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
    />
    : null;
}

export default NetworkTableRow;