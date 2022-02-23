import { ethers } from 'ethers';
import { useState } from 'react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { setNetwork } from './Networking';

const WalletConnect = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const setProvider = async () => {
    // const requestAccess = async
    if (window.ethereum) {
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any');

      const accountRequest = await ethersProvider.send('eth_requestAccounts', []);
      console.log(JSON.stringify(accountRequest));
      if (accountRequest && accountRequest.length > 0) { window.location.reload(); }
    } else {
      console.error('No web3 provider was found. Do you have MetaMask installed?');
    }
  };

  if (props. provider && props.provider.networkName) {
    return (
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle caret color='secondary'>{props.provider.networkName} Network</DropdownToggle>
        <DropdownMenu dark>
          <DropdownItem onClick={e => setNetwork(props.provider.ethers.web3, 'Avalanche', e)}>Avalanche</DropdownItem>
          <DropdownItem onClick={e => setNetwork(props.provider.ethers.web3, 'Fantom', e)}>Fantom</DropdownItem>
          <DropdownItem onClick={e => setNetwork(props.provider.ethers.web3, 'Polygon', e)}>Polygon</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
  return (<Button onClick={setProvider}>Connect Wallet</Button>);
};

export default WalletConnect;