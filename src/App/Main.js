
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
  useCookies,
  withCookies,
} from 'react-cookie';
import {
  Navigate,
  useMatch,
} from 'react-router-dom';

import { networkIdToNameMap } from './Networking';

import { ethers } from 'ethers';
import RouteView from './RouteView';
import WalletAddressModal from './WalletAddressModal';
import WalletConnect from './WalletConnect';

const Main = (props) => {
  const [provider, setProvider] = useState();
  const [activeProfile, setActiveProfile] = useState();
  const [cookies, setCookies] = useCookies(['activeProfileName', 'profiles', 'walletAddresses']);

  /**
   * activeProfileName = 'DJHorse';
   * profiles = {
   *   MetaMask: {
   *     walletAddresses: null,
   *     disabledProjects: {},
   *     isWeb3: true,
   *   },
   *   DJHorse: {
   *     walletAddresses: {
   *       avalanche: [
   *         '0x80123015',
   *         '0x80c73f84',
   *       ],
   *       fantom: [
   *         '0x80123015',
   *       ],
   *       polygon: [
   *         '0x80123015',
   *       ],
   *     },
   *     disabledProjects: {
   *       avalanche: [
   *         'thor',
   *       ],
   *       fantom: [
   *         'power',
   *       ],
   *       polygon: [],
   *     },
   *     isWeb3: false,
   *   },
   * }
   *
   *  */

  if (!cookies.activeProfileName && cookies.profiles && cookies.profiles.length > 0) {
    const profileNames = Object.keys(cookies.profiles);
    setCookies('activeProfileName', profileNames[0]);
    setActiveProfile(cookies.profiles[cookies.activeProfileName]);
  }

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
    // if (activeProfile) {
      getProvider();
    // }
  }, []);


  const matchTest = useMatch("test");
  return (
    <Container>
      {/* {!activeProfile && !matchTest ? <Navigate to="/manage-profiles" replace />: <RouteView provider = {provider} />} */}
      {provider ? <RouteView provider = {provider} /> : null}
    </Container>
  );
};

export default withCookies(Main);
