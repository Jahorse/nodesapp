import React from 'react';
import {
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
import EditProfileRoute from './Profiles/EditProfileRoute';
import ManageProfilesRoute from './Profiles/ManageProfilesRoute';
import PropfileDropdown from './ProfileDropdown';
import AboutRoute from './AboutRoute';

const RouteView = (props) => {
  let provider;
  if (props) {
    provider = props.provider;
  }
  return (
      <>
        <div>
          <Navbar color="dark" dark expand="md" className='rounded-bottom'>
            <NavbarBrand tag={RRNavLink} to="/">
              NodeApp
            </NavbarBrand>
            <Collapse navbar>
              <Nav className="me-auto" navbar>
                <NavItem><NavLink tag={RRNavLink} to="/manage-profiles">Manage Profiles</NavLink></NavItem>
                <NavItem><NavLink tag={RRNavLink} to="/about">About</NavLink></NavItem>
              </Nav>
              <NavbarText>
                <PropfileDropdown networkName={provider?.networkName} />
              </NavbarText>
            </Collapse>
          </Navbar>
        </div>
        <div className="d-flex justify-content-center pt-1">
          <Routes>
            {provider ? <Route path="/" element={<Summary profile={props.profile} provider={provider} />} /> : null}
            <Route path="/about" element={<AboutRoute />} />
            <Route path="/manage-profiles" element={<ManageProfilesRoute />} />
            <Route path="/manage-profile/:profileName" element={<EditProfileRoute />} />
          </Routes>
      </div>
    </>
  );
}

export default RouteView;
