import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

const SummaryRowChild = (props) => {
  const contract = props.contract;
  const contractNetworkName = contract.getNetworkName();

  let claimAll;
  let compoundAll;
  // We will assume that the node project has some kind of claim feature

  // Check if we're connected to the correct network to claim
  if (props.provider && props.provider.networkName !== contractNetworkName) {
    claimAll = <Button disabled>Connect to {contractNetworkName}</Button>;
    compoundAll = <Button disabled>Connect to {contractNetworkName}</Button>;

  // If we're connected to the correct network, check if the rewards are claimable yet (show a countdown?)
  } else if (contract.isClaimable(props.nodeInfo)) {
    claimAll = <Button onClick={() => contract.claimAll(props.signer)}>Claim All</Button>;

    // If we're connected, check if the contract has a compound feature so we can enable the button
    if (contract.hasCompound()) {
      compoundAll = <Button onClick={() => contract.compoundAll(props.signer)}>Compound All</Button>
    } else {
      compoundAll = <Button disabled>Compound All</Button>;
    }

  // If we're connected but rewards aren't claimable, disable the buttons
  } else {
    claimAll = <Button disabled>Claim All</Button>;
    compoundAll = <Button disabled>Compound All</Button>;
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