import React from 'react';
import {
  Col,
  Container,
  Row,
} from 'reactstrap';

const Footer = (props) => {
  return (
    <>
      <Container className='d-flex justify-content-center p-1 text-secondary'>
        Want to buy me a coffee? Send ETH, AVAX, FTM, MATIC, BSC, or CRO to&nbsp;<span className='text-primary'>0x3861596b3e937f4a05adcffab291501c72f1c930</span><br />
      </Container>
      <Container className='d-flex justify-content-center p-1 text-secondary'>
            Copyright 2022&nbsp;<a href='https://github.com/Jahorse' className='text-primary'>Jahorse</a>
      </Container>
    </>
  );
}

export default Footer;