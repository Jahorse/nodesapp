import React, { useEffect, useState } from 'react';
import {
  Container,
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

import '../scss/custom.scss';

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

const Main = (props) => {
  const [cookies, setCookie] = useCookies(['activeProfileName', 'profiles']);
  const [provider, setProvider] = useState();
  const [activeProfile, setActiveProfile] = useState();
  const [hasNoProfiles, setHasNoProfiles] = useState(false);

  if (!cookies.profiles) {
    setCookie('profiles', {});
  }
  const profileNames = Object.keys(cookies.profiles);

  useEffect(() => {
    // If the active profile isn't set, or it is set to something that isn't in the profiles list,
    // and we have profiles in the list, we will change the active profile to the next in the list.
    if ((!cookies.activeProfileName || !profileNames.includes(cookies.activeProfileName))
      && cookies.profiles
      && Object.keys(cookies.profiles).length > 0
    ) {
      const profileNames = Object.keys(cookies.profiles);
      setCookie('activeProfileName', profileNames[0]);
      setActiveProfile(profileNames[0]);
      setHasNoProfiles(false);

    } else {
      if (cookies.activeProfileName && cookies.profiles[cookies.activeProfileName]) {
        setActiveProfile(cookies.profiles[cookies.activeProfileName]);
        setHasNoProfiles(false);
      } else {
        setHasNoProfiles(true);
      }
    }

  });

  useEffect(() => {
    const getProvider = async () => {
      let profile;
      if (cookies.activeProfileName) {
        profile = cookies.profiles[cookies.activeProfileName];
      }

      let providerObj = {
        ethers: {
          web3: null,
          signer: null,
          avalanche: null,
          fantom: null,
          polygon: null,
        },
        networkName: null,
      };
      if (profile) {
        if (profile.isWeb3) {
          const ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any');
          await ethersProvider.send('eth_requestAccounts', []);
          ethersProvider.on('network', (newNetwork, oldNetwork) => {
            if (oldNetwork) {
              window.location.reload();
            }
          });

          providerObj.ethers.signer = ethersProvider.getSigner();
          providerObj.ethers.web3 = ethersProvider;
          providerObj.networkName = networkIdToNameMap[(await ethersProvider.getNetwork()).chainId];
          providerObj.ethers.avalanche = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc');
          providerObj.ethers.fantom = new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools/');
          providerObj.ethers.polygon = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');

        } else {
          if (profile.walletAddresses.avalanche.length > 0) {
            providerObj.ethers.avalanche = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc');
          }
          if (profile.walletAddresses.fantom.length > 0) {
            providerObj.ethers.fantom = new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools/');
          }
          if (profile.walletAddresses.polygon.length > 0) {
            providerObj.ethers.polygon = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');
          }
        }
      }

      setProvider(providerObj);
    }
    if (activeProfile) {
      getProvider();
    }
  }, [activeProfile, cookies.activeProfileName, cookies.profiles]);


  const onManageProfilesPage = useMatch("manage-profiles");
  const shouldRedirect = !onManageProfilesPage && hasNoProfiles;
  return (
    <Container>
      {shouldRedirect ? <Navigate to="/manage-profiles" replace /> : null}
      {(provider || onManageProfilesPage) ? <RouteView profileName={cookies.activeProfileName} profile={activeProfile} provider={provider} /> : null}
    </Container>
  );
};

export default withCookies(Main);
