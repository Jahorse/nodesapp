import React, { useState } from 'react';
import {
  useCookies,
} from 'react-cookie';
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

const PropfileDropdown = (props) => {
  const [cookies, setCookie] = useCookies(['activeProfileName', 'profiles']);
  const [menuOpen, setToggleMenu] = useState(false);

  const toggleMenu = () => {
    setToggleMenu(!menuOpen);
  };

  const setActiveProfile = (profileName) => {
    if (!Object.keys(cookies.profiles).includes(profileName)) {
      console.error(`Trying to activate invalid profile: ${profileName}`);
      return;
    }
    setCookie('activeProfileName', profileName);
    window.location.reload();
  };

  const dropdownItems = [];
  for (const profileName in cookies.profiles) {
    if (profileName !== cookies.activeProfileName) {
      dropdownItems.push(
        <DropdownItem key={profileName} onClick={() => setActiveProfile(profileName)}>
          {profileName.replace('_', '')}
        </DropdownItem>
      );
    }
  }

  let menuText;
  if (cookies.activeProfileName) {
    if (cookies.activeProfileName === '_MetaMask') {
      menuText = props.networkName;
    } else {
      menuText = cookies.activeProfileName;
    }
  } else {
    menuText = "No Profile";
  }

  if (dropdownItems.length > 0) {
    return (
      <ButtonDropdown isOpen={menuOpen} toggle={toggleMenu}>
        <DropdownToggle caret>
          {menuText}
        </DropdownToggle>
        <DropdownMenu>{dropdownItems}</DropdownMenu>
      </ButtonDropdown>
    );
  } else {
    return (
      <ButtonDropdown isOpen={menuOpen} toggle={toggleMenu}>
        <DropdownToggle>
          {menuText}
        </DropdownToggle>
      </ButtonDropdown>
    );
  }

};

export default PropfileDropdown;