/**
 * Copyright David Horsman. All Rights Reserved.
 * SPDX-License-Identifier: Attribution-NonCommercial-NoDerivatives 4.0 International
 */

import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Button, Container, Table } from 'reactstrap';
import LouvertureContract from './ContractsApi/LouvertureContract';
import PentagonContract from './ContractsApi/PentagonContract';
import PowerFlatversalContract from './ContractsApi/PowerFlatversalContract';
import PowerHumanContract from './ContractsApi/PowerHumanContract';
import PowerMicroscopicContract from './ContractsApi/PowerMicroscopicContract';
import PowerSuperhumanContract from './ContractsApi/PowerSuperhumanContract';

import ThorFreyaContract from './ContractsApi/ThorFreyaContract';
import ThorHeimdallContract from './ContractsApi/ThorHeimdallContract';
import ThorOdinContract from './ContractsApi/ThorOdinContract';
import ThorThorContract from './ContractsApi/ThorThorContract';
import UniverseContract from './ContractsApi/UniverseContract';
import VaporContract from './ContractsApi/VaporContract';

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

const SummaryRowParent = (props) => {
  const [nodeInfo, updateNodeInfo] = useState();
  useEffect(() => {
    const getNodeData = async () => {
      updateNodeInfo(await props.contract.getNodes());
    }
    getNodeData();
  }, [props.contract]);
  return (nodeInfo && nodeInfo.length > 0) ? <SummaryRowChild provider={props.provider} nodeInfo={nodeInfo} contract={props.contract} /> : null;
}

const Summary = (props) => {
  const [cookies] = useCookies(['walletAddresses']);

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
          <SummaryRowParent contract={new LouvertureContract(props.provider, cookies.walletAddresses.polygon)} provider= {props.provider} />
          <SummaryRowParent contract={new PentagonContract(props.provider, cookies.walletAddresses.polygon)} provider= {props.provider} />
          <SummaryRowParent contract={new PowerFlatversalContract(props.provider, cookies.walletAddresses.fantom)} provider= {props.provider} />
          <SummaryRowParent contract={new PowerMicroscopicContract(props.provider, cookies.walletAddresses.fantom)} provider= {props.provider} />
          <SummaryRowParent contract={new PowerHumanContract(props.provider, cookies.walletAddresses.fantom)} provider= {props.provider} />
          <SummaryRowParent contract={new PowerSuperhumanContract(props.provider, cookies.walletAddresses.fantom)} provider= {props.provider} />
          <SummaryRowParent contract={new ThorHeimdallContract(props.provider, cookies.walletAddresses.avalanche)} provider= {props.provider} />
          <SummaryRowParent contract={new ThorFreyaContract(props.provider, cookies.walletAddresses.avalanche)} provider= {props.provider} />
          <SummaryRowParent contract={new ThorThorContract(props.provider, cookies.walletAddresses.avalanche)} provider= {props.provider} />
          <SummaryRowParent contract={new ThorOdinContract(props.provider, cookies.walletAddresses.avalanche)} provider= {props.provider} />
          <SummaryRowParent contract={new UniverseContract(props.provider, cookies.walletAddresses.avalanche)} provider= {props.provider} />
          <SummaryRowParent contract={new VaporContract(props.provider, cookies.walletAddresses.avalanche)} provider= {props.provider} />
        </tbody>
      </Table>
    </Container>
  );
}

export default Summary;
