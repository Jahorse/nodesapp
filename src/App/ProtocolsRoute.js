import React, { useEffect } from 'react';
import {
  Container,
  Row,
} from 'reactstrap';

const ProtocolsRoute = (props) => {
  useEffect(() => {
    document.title = "Node Protocols";
  });

  return (
    <Container>
      <Row className='bg-info rounded m-2 px-2 py-4 text-dark'>
        <h1>Supported Protocols</h1>
        <p className='pt-2 ps-3'>It is difficult to keep up with all the node projects out there, not only are there new ones popping up every day,
        but the existing ones are always making upgrades. NodesApp aims to try to add support for the protocols with the most users and highest market cap
        as quick as we can, and are dilligent in following them to patch in any updates they make. Below is a list of all the projects currently
        with support.</p>
        <span>
          <h4 className='ps-3'>Avalanche</h4>
          <ol className='ps-5'>
            <li><a href='https://app.aleph.finance/' className='link-dark'>Aleph</a></li>
            <li><a href='https://dapp.ascendnodeclub.money/' className='link-dark'><s>Ascend</s></a></li>
            <li><s>Etherstones</s></li>
            <li><a href='https://thephoenix.finance/app/' className='link-dark'>Phoenix/Fire</a></li>
            <li><a href='https://app.lava.financial/'  className='link-dark'>Lava</a></li>
            <li><a href='https://www.louverture.finance/blackhole'  className='link-dark'>Louverture</a></li>
            <li><a href='https://app.nebulanodes.finance/'  className='link-dark'><s>Nebula</s></a></li>
            <li><a href='https://app.polar.financial/'  className='link-dark'>Polar</a></li>
            <li><a href='https://projectx.financial/#nodes'  className='link-dark'><s>Project X</s></a></li>
            <li><a href='https://redlightnodes.app/'  className='link-dark'><s>Redlight Nodes District</s></a></li>
            <li><a href='https://dapp.tavern.money/'  className='link-dark'>Tavern</a></li>
            <li><a href='https://app.thor.financial/'  className='link-dark'>Thor</a></li>
            <li><s>Universe</s></li>
            <li><a href='https://app.vapornodes.finance/'  className='link-dark'>Vapor</a></li>
          </ol>
          <h4 className='ps-3'>Cronos</h4>
          <ol className='ps-5'>
            <li><a href='https://cronodes.app/'  className='link-dark'>Cronodes</a></li>
          </ol>
          <h4 className='ps-3'>Ethereum</h4>
          <ol className='ps-5'>
            <li><a href='https://app.strongblock.com/'  className='link-dark'>StrongBlock</a></li>
          </ol>
          <h4 className='ps-3'>Fantom</h4>
          <ol className='ps-5'>
            <li><a href='https://atlascloud.network/app' className='link-dark'>Atlas</a></li>
            <li><a href='https://app.comb.financial/dashboard' className='link-dark'>Comb</a></li>
            <li><a href='https://app.powernode.io/#'  className='link-dark'>Power</a></li>
            <li><a href='https://app.samurai.financial/'  className='link-dark'>Samurai</a></li>
          </ol>
          <h4 className='ps-3'>Polygon</h4>
          <ol className='ps-5'>
            <li><a href='https://app.dominium.finance/'  className='link-dark'>Dominium</a></li>
            <li><a href='https://dapp.hive.investments/'  className='link-dark'>Hive</a></li>
            <li><s>Pentagon</s></li>
            <li><a href='https://www.home.stackos.io/nodes'  className='link-dark'>StackOS</a></li>
          </ol>
        </span>
      </Row>
    </Container>
  );
}

export default ProtocolsRoute;