import React from 'react';
import {
  Container,
  Row,
} from 'reactstrap';

const AboutRoute = (props) => {
  return (
    <Container>
      <Row className='bg-dark rounded m-5 px-2 py-4 text-light'>
        <h1>About NodeApp</h1>
        <span>
          <h2>Security</h2>
          <p className='pt-2 ps-3'>NodeApp works 100% client side, none of your data touches our servers:</p>
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
          <p className='pt-2 ps-3'>You should never be asked to approve any contracts by the NodeApp. If you are asked to approve anything, you should go to that node project's dApp and confirm there that they have a contract that needs your approval.</p>
        </span>
        <span>
          <h2>Supported Projects</h2>
          <h4 className='ps-3'>Avalanche</h4>
          <ol className='ps-5'>
            <li><a href='https://dapp.ascendnodeclub.money/' className='link-light'>Ascend</a></li>
            <li><a href='https://app.nebulanodes.finance/'  className='link-light'>Nebula</a></li>
            <li><a href='https://redlightnodes.app/'  className='link-light'>Redlight Nodes District</a></li>
            <li><a href='https://app.thor.financial/'  className='link-light'>Thor</a></li>
            <li><a href='https://univ.money/observatory'  className='link-light'>Universe</a></li>
            <li><a href='https://app.vapornodes.finance/'  className='link-light'>Vapor</a></li>
          </ol>
          <h4 className='ps-3'>Ethereum</h4>
          <ol className='ps-5'>
            <li><a href='https://app.strongblock.com/'  className='link-light'>StrongBlock</a></li>
          </ol>
          <h4 className='ps-3'>Fantom</h4>
          <ol className='ps-5'>
            <li><a href='https://app.powernode.io/#'  className='link-light'>Power</a></li>
          </ol>
          <h4 className='ps-3'>Polygon</h4>
          <ol className='ps-5'>
            <li><a href='https://app.pentagon.financial/node'  className='link-light'>Pentagon</a></li>
          </ol>
        </span>
      </Row>
    </Container>
  );
}

export default AboutRoute;