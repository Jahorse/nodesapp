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

const SummaryRowChild = (props) => {
  const contract = props.contract;

  const columns = [
    (<th scope="row">{contract.getName()}</th>),
    (<td>{parseFloat(contract.getTotalRewards(props.nodeInfo, true)).toFixed(contract.showDecimalPlaces())} {contract.getToken()}</td>),
  ];

  if (props.isWeb3) {
    const contractNetworkName = contract.getNetworkName();
    let claimAll;
    let compoundAll;

    // NEW LOGIC
    const timeUntilClaim = contract.timeUntilClaim();
    if (contract.hasClaim()) {
      if (timeUntilClaim === 0) {
        if (props.provider && props.provider.networkName === contractNetworkName) {
          claimAll = <Button onClick={() => contract.claimAll(props.signer)}>Claim All</Button>;
        } else {
          claimAll = <Button disabled>Connect to {contractNetworkName}</Button>;
        }
      }  else {
        claimAll = <Button disabled>{dhm(timeUntilClaim)}</Button>;
      }
    }
    if (contract.hasCompound()) {
      if (timeUntilClaim === 0) {
        if (props.provider && props.provider.networkName === contractNetworkName) {
          compoundAll = <Button onClick={() => contract.compoundAll(props.signer)}>Compound All</Button>;
        } else {
          compoundAll = <Button disabled>Connect to {contractNetworkName}</Button>;
        }
      }  else {
        compoundAll = <Button disabled>{dhm(timeUntilClaim)}</Button>;
      }
    }
    columns.push(
      (<td>{claimAll}</td>),
      (<td>{compoundAll}</td>),
    );
  }

  return (<tr>{columns}</tr>);
}

const SummaryRow = (props) => {
  const [nodeInfo, updateNodeInfo] = useState();
  useEffect(() => {
    const getNodeData = async () => {
      updateNodeInfo(await props.contract.getNodes());
    }
    getNodeData();
  }, [props.contract]);
  return (nodeInfo && nodeInfo.length > 0)
    ? <SummaryRowChild provider={props.provider} nodeInfo={nodeInfo} contract={props.contract} isWeb3={props.isWeb3} />
    : null;
}

export default SummaryRow;