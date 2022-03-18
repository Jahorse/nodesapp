import React, { useState } from 'react';
import { IconContext } from "react-icons";
import { AiOutlineNodeIndex } from 'react-icons/ai';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';
import {
  NavLink as RRNavLink,
} from 'react-router-dom';

import PropfileDropdown from './ProfileDropdown';

const HeaderMenu = (props) => {
  const [menuOpen, setToggleMenu] = useState(false);

  const toggleMenu = () => {
    setToggleMenu(!menuOpen);
  };

  return (
    <Navbar color="dark" dark expand="md" className='rounded-bottom'>
    <NavbarBrand tag={RRNavLink} to="/">
      <IconContext.Provider value={{ style: { fontSize: '1.5em', verticalAlign: 'middle' } }}>
        <AiOutlineNodeIndex />
      </IconContext.Provider>
      &nbsp;NodesApp
    </NavbarBrand>
    <NavbarToggler onClick={toggleMenu} />
    <Collapse navbar isOpen={menuOpen}>
      <Nav className="me-auto" navbar>
        <NavItem><NavLink tag={RRNavLink} to="/manage-profiles">Manage Profiles</NavLink></NavItem>
        <NavItem><NavLink tag={RRNavLink} to="/about">About</NavLink></NavItem>
      </Nav>
      <Nav>
        <PropfileDropdown networkName={props.provider?.networkName} />
      </Nav>
    </Collapse>
  </Navbar>
  );
}

export default HeaderMenu;