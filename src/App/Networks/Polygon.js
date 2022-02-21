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

import PolygonHome from './PolygonHome';
import Pentagon from '../Projects/Pentagon';

class Polygon extends Component {
  render() {
    return (
        <Container>
          <div className=" menu-active-state">
            <Nav tabs>
              <NavItem><NavLink tag={RRNavLink} to="/">Summary</NavLink></NavItem>
              <NavItem><NavLink tag={RRNavLink} to="/pentagon">Pentagon</NavLink></NavItem>
            </Nav>
          </div>
          <div className="d-flex justify-content-right p-5">
            <Routes>
              <Route path="/" element={<PolygonHome />}/>
              <Route path="/pentagon" element={<Pentagon />}/>
            </Routes>
        </div>
      </Container>
    );
  }
}

export default Polygon;
