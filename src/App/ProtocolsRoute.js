import React from 'react';
import {
  Container,
  Row,
} from 'reactstrap';

const ProtocolsRoute = (props) => {
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
            <li><a href='https://dapp.ascendnodeclub.money/' className='link-dark'>Ascend</a></li>
            <li><a href='https://etherstones.fi/dashboard' className='link-dark'>Etherstones</a></li>
            <li><a href='https://thephoenix.finance/app/' className='link-dark'>Phoenix/Fire</a></li>
            <li><a href='https://www.louverture.finance/blackhole'  className='link-dark'>Louverture</a></li>
            <li><a href='https://app.nebulanodes.finance/'  className='link-dark'>Nebula</a></li>
            <li><a href='https://projectx.financial/#nodes'  className='link-dark'>Project X</a></li>
            <li><a href='https://redlightnodes.app/'  className='link-dark'>Redlight Nodes District</a></li>
            <li><a href='https://app.thor.financial/'  className='link-dark'>Thor</a></li>
            <li><a href='https://univ.money/observatory'  className='link-dark'>Universe</a></li>
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
          </ol>
          <h4 className='ps-3'>Polygon</h4>
          <ol className='ps-5'>
            <li><a href='https://app.dominium.finance/'  className='link-dark'>Dominium</a></li>
            <li><a href='https://dapp.hive.investments/'  className='link-dark'>Hive</a></li>
            <li><a href='https://app.pentagon.financial/node'  className='link-dark'>Pentagon</a></li>
            <li><a href='https://www.home.stackos.io/nodes'  className='link-dark'>StackOS</a></li>
          </ol>
        </span>
      </Row>
    </Container>
  );
}

export default ProtocolsRoute;