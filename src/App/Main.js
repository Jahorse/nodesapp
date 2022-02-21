
/**
 * Copyright David Horsman. All Rights Reserved.
 * SPDX-License-Identifier: Attribution-NonCommercial-NoDerivatives 4.0 International
 */

import React, { Component } from 'react';
import {
  Container,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from 'reactstrap';
import {
  HashRouter
} from 'react-router-dom';

import { networkIdToNameMap, networkNameToIdMap, setNetwork } from './Networking';
import '../scss/custom.scss';
import { ethers } from 'ethers';
import Avalanche from './Networks/Avalanche';
import Fantom from './Networks/Fantom';
import Polygon from './Networks/Polygon';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = { dropdownOpen: false, network: null, provider: null };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.setNetwork = this.setNetwork.bind(this);
  }

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  setNetwork = (provider, networkName, evt) => {
    evt.preventDefault();
    setNetwork(provider, networkName);

    this.setState({ networkName });
  }

  async componentDidMount () {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    await provider.send('eth_requestAccounts', []);
    provider.on('network', (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        window.location.reload();
      }
    });
    const network = await provider.getNetwork();
    this.setState({
      provider,
      network: networkIdToNameMap[network.chainId],
    });
  }

  render() {
    const { dropdownOpen, network, provider } = this.state;
    let networkComponent;
    if (network === 'Avalanche') {
      networkComponent = <Avalanche provider = {this.state.provider} />
    } else if (network === 'Fantom') {
      networkComponent = <Fantom provider = {this.state.provider} />
    } else if (network === 'Polygon') {
      networkComponent = <Polygon provider = {this.state.provider} />
    }

    return (
      <HashRouter>
        <Container>
          <Row>
            <Col xs={8} lg={9}>
              <div className="d-flex justify-content-left p-4">
                <h1 className='text-dark'>Node Stuff</h1>
              </div>
            </Col>
            <Col xs={1} lg={3}>
              <div className="d-flex justify-content-center p-4">
                <Dropdown isOpen={dropdownOpen} toggle={this.toggleDropdown}>
                  <DropdownToggle caret color='secondary'>{network} Network</DropdownToggle>
                  <DropdownMenu dark>
                    <DropdownItem onClick={e => this.setNetwork(provider, 'Avalanche', e)}>Avalanche</DropdownItem>
                    <DropdownItem onClick={e => this.setNetwork(provider, 'Fantom', e)}>Fantom</DropdownItem>
                    <DropdownItem onClick={e => this.setNetwork(provider, 'Polygon', e)}>Polygon</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </Col>
          </Row>
          {networkComponent}
        </Container>
      </HashRouter>
    );
  }
}

export default Main;
