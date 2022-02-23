
/**
 * Copyright David Horsman. All Rights Reserved.
 * SPDX-License-Identifier: Attribution-NonCommercial-NoDerivatives 4.0 International
 */

import React, { useEffect, useState } from 'react';
import {
  Container,
  Col,
  Row,
} from 'reactstrap';
import {
  withCookies,
} from 'react-cookie';
import {
  HashRouter
} from 'react-router-dom';

import { networkIdToNameMap } from './Networking';
import '../scss/custom.scss';
import { ethers } from 'ethers';
import RouteView from './RouteView';
import WalletAddressModal from './WalletAddressModal';
import WalletConnect from './WalletConnect';

const Main = (props) => {
  const [provider, setProvider] = useState();

  useEffect(() => {
    const getProvider = async () => {
      let walletUnlocked = false;

      let ethersProvider;
      try {
        ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      } catch {
        ethersProvider = null;
      }

      const providerObj = {
        ethers: {
          web3: null,
          signer: null,
          avalanche: new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc'),
          fantom: new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools/'),
          polygon: new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/'),
        },
        networkName: null,
      };

      if (ethersProvider) {
        await ethersProvider.getSigner().getAddress()
          .then((_) => {
            walletUnlocked = true;
          }).catch((_) => {
            walletUnlocked = false
          });
      }

      if (walletUnlocked) {
        await ethersProvider.send('eth_requestAccounts', []);
        ethersProvider.on('network', (newNetwork, oldNetwork) => {
          if (oldNetwork) {
            window.location.reload();
          }
        });

        providerObj.ethers.signer = ethersProvider.getSigner();
        providerObj.ethers.web3 = ethersProvider;
        providerObj.networkName = networkIdToNameMap[(await ethersProvider.getNetwork()).chainId];
      }

      setProvider(providerObj);
    }
    getProvider();
  }, []);

  return (
    <HashRouter>
      <Container>
        <Row>
          <Col xs={6} lg={8}>
            <div className="d-flex justify-content-left p-4">
              <h1 className='text-dark'>Node Stuff</h1>
            </div>
          </Col>
          <Col xs={3} lg={4}>
            <div className="d-flex justify-content-center p-4">
              <span className="p-1">
                <WalletAddressModal provider={provider} />
              </span>
              <span className="p-1">
                <WalletConnect provider={provider} />
              </span>
            </div>
          </Col>
        </Row>
        {/* {networkComponent} */}
        {provider ? <RouteView provider = {provider} /> : null}
      </Container>
    </HashRouter>
  );
};

export default withCookies(Main);
