import React from 'react';
import { Container } from 'reactstrap';

const Footer = (props) => {
  return (
    <Container className='d-flex justify-content-center p-1'>
      Copyright 2022&nbsp;<a href='https://github.com/Jahorse' className='link-dark'>Jahorse</a>
    </Container>
  );
}

export default Footer;