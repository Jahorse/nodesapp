import React, { useEffect, useState } from 'react';
import {
  useCookies,
} from 'react-cookie';
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

const PropfileMenu = (props) => {
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

  return (
    <ButtonDropdown isOpen={menuOpen} toggle={toggleMenu}>
      <DropdownToggle caret>
        {cookies.activeProfileName.replace('_', '')}
      </DropdownToggle>
      <DropdownMenu>
        {dropdownItems}
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default PropfileMenu;