import React from 'react';
import {
  Container,
  Row,
} from 'reactstrap';

const SecurityRoute = (props) => {
  return (
    <Container>
      <Row className='bg-info rounded m-2 px-2 py-4 text-dark'>
        <h1>Security</h1>
        <span>
          <p className='pt-2 ps-3'>NodesApp keeps security as a top priority. We'll never ask you to approve any contracts and we do not support any
          functionality that would touch any of the tokens in your wallet.</p>
          <p className='pt-2 ps-3'>NodesApp works 100% client side, none of your data ever touches our servers:</p>
          <ul className='ps-5'>
            <li>
              Your profiles and wallet addresses are stored client-side in a cookie in your browser.
            </li>
            <li>
              If you connect your wallet, all transactions are sent directly from your wallet's browser extension to the blockchain network to be executed in
              the node project's smart contract that you're trying to interact with.
            </li>
            <li>
              We don't collect any information about your nodes. All node information is fetched directly from the blockchain by your browser.
            </li>
          </ul>
          <p className='pt-2 ps-3'><b>You should never be asked to approve any contracts by the NodesApp.</b> If you are ever asked to approve any contracts by
          NodesApp, that likely means the protocol has updated their contracts and you should go to their official dApp and confirm there that they have
          a contract that needs your approval. There may be migration actions that you need to take in order for it to function properly.</p>
        </span>
      </Row>
    </Container>
  );
}

export default SecurityRoute;