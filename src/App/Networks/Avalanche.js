/**
 * Copyright David Horsman. All Rights Reserved.
 * SPDX-License-Identifier: Attribution-NonCommercial-NoDerivatives 4.0 International
 */

import React, { Component } from 'react';
import {
  Container,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {
  NavLink as RRNavLink,
  Route,
  Routes,
} from 'react-router-dom';

import AvalancheHome from './AvalancheHome';
import Universe from '../Projects/Universe';
import Vapor from '../Projects/Vapor';

class Avalanche extends Component {
  render() {
    return (
        <Container>
          {/* <div className=" menu-active-state">
            <Nav tabs>
              <NavItem><NavLink tag={RRNavLink} to="/">Summary</NavLink></NavItem>
              <NavItem><NavLink tag={RRNavLink} to="/universe">Universe</NavLink></NavItem>
              <NavItem><NavLink tag={RRNavLink} to="/vapor">Vapor</NavLink></NavItem>
            </Nav>
          </div> */}
          <div className="d-flex justify-content-right p-5">
            <Routes>
              <Route path="/" element={<AvalancheHome provider = {this.props.provider} />}/>
              <Route path="/universe" element={<Universe provider = {this.props.provider} />}/>
              <Route path="/vapor" element={<Vapor provider = {this.props.provider} />}/>
            </Routes>
        </div>
      </Container>
    );
  }
}

export default Avalanche;
