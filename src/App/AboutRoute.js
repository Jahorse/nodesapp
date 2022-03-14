import React from 'react';
import {
  Container,
  Row,
} from 'reactstrap';

const AboutRoute = (props) => {
  return (
    <Container>
      <Row className='bg-dark rounded m-5 p-3 pb-4 text-light'>
        <h1>About NodeApp</h1>
        <span>
          <p className='pt-2'>NodeApp works 100% client side, none of your data touches our servers:</p>
          <ul>
            <li>
              Your profiles and wallet addresses are stored client-side in a cookie in your browser.
            </li>
            <li>
              If you connect your wallet, all transactions are sent directly from your wallet's browser extension to the blockchain network to be executed in the node project's smart contract that you're trying to interact with.
            </li>
          </ul>
          <p className='pt-2'>You should never be asked to approve any contracts by the NodeApp. If you are asked to approve anything, you should go to that node project's dApp and confirm there that they have a contract that needs your approval.</p>
        </span>
      </Row>
    </Container>
  );
}

export default AboutRoute;