/**
 * Copyright David Horsman. All Rights Reserved.
 * SPDX-License-Identifier: Attribution-NonCommercial-NoDerivatives 4.0 International
 */

import React from 'react';
import {
  Button,
  Collapse,
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
import ManageAddressesRoute from './ManageAddressesRoute';
import ManageProfilesRoute from './ManageProfilesRoute';

const RouteView = (props) => {
  let provider;
  if (props) {
    provider = props.provider;
  }
  return (
      <>
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={RRNavLink} to="/">
              NodeStuff
            </NavbarBrand>
            <Collapse navbar>
              <Nav className="me-auto" navbar>
                <NavItem><NavLink tag={RRNavLink} to="/manage-profiles">Manage Profiles</NavLink></NavItem>
              </Nav>
              <NavbarText><Button>{props.profileName.replace('_', '')}</Button></NavbarText>
            </Collapse>
          </Navbar>
        </div>
        <div className="d-flex justify-content-center p-5">
          <Routes>
            {provider ? <Route path="/" element={<Summary profile={props.profile} provider={provider} />} /> : null}
            <Route path="/manage-profiles" element={<ManageProfilesRoute />} />
            <Route path="/manage-profile/:profileName" element={<ManageAddressesRoute />} />
          </Routes>
      </div>
    </>
  );
}

export default RouteView;
