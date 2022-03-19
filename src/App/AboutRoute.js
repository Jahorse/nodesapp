import React from 'react';
import {
  Container,
  Row,
} from 'reactstrap';

const AboutRoute = (props) => {
  return (
    <Container>
      <Row className='bg-info rounded m-2 px-2 py-4 text-dark'>
        <h1>About NodesApp</h1>
        <span>
          <h2>Security</h2>
          <p className='pt-2 ps-3'>NodesApp works 100% client side, none of your data touches our servers:</p>
          <ul className='ps-5'>
            <li>
              Your profiles and wallet addresses are stored client-side in a cookie in your browser.
            </li>
            <li>
              If you connect your wallet, all transactions are sent directly from your wallet's browser extension to the blockchain network to be executed in the node project's smart contract that you're trying to interact with.
            </li>
            <li>
              We don't collect any information about your nodes. All node information is fetched directly from the blockchain by your browser.
            </li>
          </ul>
          <p className='pt-2 ps-3'>You should never be asked to approve any contracts by the NodesApp. If you are asked to approve anything, you should go to that node project's dApp and confirm there that they have a contract that needs your approval.</p>
        </span>
        <span>
          <h2>Supported Projects</h2>
          <h4 className='ps-3'>Avalanche</h4>
          <ol className='ps-5'>
            <li><a href='https://dapp.ascendnodeclub.money/' className='link-dark'>Ascend</a></li>
            <li><a href='https://app.nebulanodes.finance/'  className='link-dark'>Nebula</a></li>
            <li><a href='https://redlightnodes.app/'  className='link-dark'>Redlight Nodes District</a></li>
            <li><a href='https://app.thor.financial/'  className='link-dark'>Thor</a></li>
            <li><a href='https://univ.money/observatory'  className='link-dark'>Universe</a></li>
            <li><a href='https://app.vapornodes.finance/'  className='link-dark'>Vapor</a></li>
          </ol>
          <h4 className='ps-3'>Ethereum</h4>
          <ol className='ps-5'>
            <li><a href='https://app.strongblock.com/'  className='link-dark'>StrongBlock</a></li>
          </ol>
          <h4 className='ps-3'>Fantom</h4>
          <ol className='ps-5'>
            <li><a href='https://app.comb.financial/dashboard' className='link-dark'>Comb</a></li>
            <li><a href='https://app.powernode.io/#'  className='link-dark'>Power</a></li>
          </ol>
          <h4 className='ps-3'>Polygon</h4>
          <ol className='ps-5'>
            <li><a href='https://app.pentagon.financial/node'  className='link-dark'>Pentagon</a></li>
          </ol>
        </span>
      </Row>
    </Container>
  );
}

export default AboutRoute;