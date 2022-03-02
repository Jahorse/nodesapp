/**
 * Copyright David Horsman. All Rights Reserved.
 * SPDX-License-Identifier: Attribution-NonCommercial-NoDerivatives 4.0 International
 */

import React from 'react';
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavItem,
  NavLink,
} from 'reactstrap';
import {
  NavLink as RRNavLink,
  Route,
  Routes,
} from 'react-router-dom';

import Summary from './SummaryRoute';
import TestRoute from './ManageProfilesRoute';

const RouteView = (props) => {
  let provider;
  if (props) {
    provider = props.provider;
  }
  return (
      <Container>
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={RRNavLink} to="/">
              NodeStuff
            </NavbarBrand>
            <Collapse navbar>
              <Nav className="me-auto" navbar>
                {/* <NavItem><NavLink tag={RRNavLink} to="/">Summary</NavLink></NavItem> */}
                <NavItem><NavLink tag={RRNavLink} to="/manage-profiles">Manage Profiles</NavLink></NavItem>
              </Nav>
              <NavbarText>Connected</NavbarText>
            </Collapse>
          </Navbar>
        </div>
        <div className="d-flex justify-content-center p-5">
          <Routes>
            {provider ? <Route path="/" element={<Summary provider = {provider} />} /> : null}
            <Route path="/manage-profiles" element={<TestRoute />} />
          </Routes>
      </div>
    </Container>
  );
}

export default RouteView;
