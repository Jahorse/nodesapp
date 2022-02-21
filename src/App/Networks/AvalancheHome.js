/**
 * Copyright David Horsman. All Rights Reserved.
 * SPDX-License-Identifier: Attribution-NonCommercial-NoDerivatives 4.0 International
 */

import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'reactstrap';

import { UniverseContract } from '../ContractsApi/UniverseContract';
import { VaporContract } from '../ContractsApi/VaporContract';
import { networkIdToNameMap, setNetwork } from '../Networking';

const SummaryRowChild = (props) => {
  let claimAll;
  let compoundAll;
  const networkName = networkIdToNameMap[props.network.chainId];

  if (props.contract.isClaimable(props.nodeInfo)) {
    if (networkName == 'Avalanche') {
      claimAll = <Button onClick={() => props.contract.claimAll(props.signer)}>Claim All</Button>;
      compoundAll = <Button onClick={() => props.contract.compoundAll(props.signer)}>Compound All</Button>
    } else {
      claimAll = <Button onClick={() => setNetwork(props.signer, 'Avalanche')}>Claim All</Button>;
      compoundAll = <Button onClick={() => setNetwork(props.signer, 'Avalanche')}>Compound All</Button>
    }
  } else {
    claimAll = <Button disabled>Claim All</Button>;
    compoundAll = <Button disabled>Compound All</Button>
  }
  return (
    <tr>
      <th scope="row">
        {props.name}
      </th>
      <td>
        {parseInt(props.contract.getTotalRewards(props.nodeInfo, true))} {props.symbol}
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
  const [provider] = useState(props.provider);
  const [signer,] = useState(props.signer);
  const [nodeContract] = useState(props.contract);

  const [nodeInfo, updateNodeInfo] = useState();
  const [network, updateNetwork] = useState();
  useEffect(() => {
    const getNodeData = async () => {
      updateNetwork(await provider.getNetwork());
      updateNodeInfo(await nodeContract.getNodes(await signer.getAddress(), provider));
    }
    getNodeData();
  });
  return (nodeInfo && nodeInfo.length > 0) ? <SummaryRowChild name={props.name} symbol={props.symbol} nodeInfo={nodeInfo} contract={nodeContract} network={network} signer={signer} /> : null;
}

const AvalancheHome = (props) => {
  const [provider] = useState(props.provider);
  const [signer, updateSigner] = useState();

  useEffect(() => {
    const getSigner = async () => {
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      updateSigner(signer);
    }
    getSigner();
  });

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
          {signer && <SummaryRowParent name='Universe' symbol='UNIV' provider={provider} signer={signer} contract={new UniverseContract()} />}
          {signer && <SummaryRowParent name='Vapor' symbol = 'VPND' provider={provider} signer={signer} contract={new VaporContract()} />}
        </tbody>
      </Table>
    </Container>
  );
}

export default AvalancheHome;
