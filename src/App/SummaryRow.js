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
  const contractNetworkName = contract.getNetworkName();

  let claimAll;
  let compoundAll;
  // // We will assume that the node project has some kind of claim feature

  // // Check if we're connected to the correct network to claim
  // if (props.provider && props.provider.networkName !== contractNetworkName) {
  //   claimAll = <Button disabled>Connect to {contractNetworkName}</Button>;
  //   compoundAll = <Button disabled>Connect to {contractNetworkName}</Button>;

  // // If we're connected to the correct network, check if the rewards are claimable yet (show a countdown?)
  // } else if (contract.isClaimable(props.nodeInfo)) {
  //   claimAll = <Button onClick={() => contract.claimAll(props.signer)}>Claim All</Button>;

  //   // If we're connected, check if the contract has a compound feature so we can enable the button
  //   if (contract.hasCompound()) {
  //     compoundAll = <Button onClick={() => contract.compoundAll(props.signer)}>Compound All</Button>
  //   } else {
  //     compoundAll = <Button disabled>Compound All</Button>;
  //   }

  // // If we're connected but rewards aren't claimable, disable the buttons
  // } else {
  //   claimAll = <Button disabled>Claim All</Button>;
  //   compoundAll = <Button disabled>Compound All</Button>;
  // }

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

  return (
    <tr>
      <th scope="row">
        {contract.getName()}
      </th>
      <td>
        {parseFloat(contract.getTotalRewards(props.nodeInfo, true)).toFixed(contract.showDecimalPlaces())} {contract.getToken()}
      </td>
      <td>
        {claimAll}
      </td>
      <td>
        {compoundAll}
      </td>
    </tr>
  );
}

const SummaryRow = (props) => {
  const [nodeInfo, updateNodeInfo] = useState();
  useEffect(() => {
    const getNodeData = async () => {
      updateNodeInfo(await props.contract.getNodes());
    }
    getNodeData();
  }, [props.contract]);
  return (nodeInfo && nodeInfo.length > 0) ? <SummaryRowChild provider={props.provider} nodeInfo={nodeInfo} contract={props.contract} /> : null;
}

export default SummaryRow;