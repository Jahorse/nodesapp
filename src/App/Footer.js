import React from 'react';
import {
  Container,
} from 'reactstrap';

import { breakpoint, useViewport } from './Utils/Hooks';

const Footer = (props) => {
  const { width } = useViewport();

  const lineBreak = width < breakpoint ? <br /> : " ";
  return (
    <>
      <Container className='d-flex justify-content-center p-1 text-secondary'>
        Want to buy me a coffee?{lineBreak}Send ETH, AVAX, FTM, MATIC, BSC, or CRO to 0x3861596b3e937f4a05adcffab291501c72f1c930
      </Container>
      <Container className='d-flex justify-content-center p-1 text-secondary'>
            Copyright 2022&nbsp;<a href='https://github.com/Jahorse' className='text-primary'>Jahorse</a>
      </Container>
    </>
  );
}

export default Footer;