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

import FantomHome from './FantomHome';
import Power from '../Projects/Power';
import PowerFarm from '../Projects/PowerFarm';

class Fantom extends Component {
  render() {
    return (
        <Container>
          <div className=" menu-active-state">
            <Nav tabs>
              <NavItem><NavLink tag={RRNavLink} to="/">Summary</NavLink></NavItem>
              <NavItem><NavLink tag={RRNavLink} to="/power">Power</NavLink></NavItem>
              <NavItem><NavLink tag={RRNavLink} to="/power-farm">Power Farms</NavLink></NavItem>
            </Nav>
          </div>
          <div className="d-flex justify-content-right p-5">
            <Routes>
              <Route path="/" element={<FantomHome />}/>
              <Route path="/power" element={<Power />}/>
              <Route path="/power-farm" element={<PowerFarm />}/>
            </Routes>
        </div>
      </Container>
    );
  }
}

export default Fantom;
