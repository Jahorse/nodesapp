import React, { useEffect, useMemo, useState } from 'react';
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

import { networkIdToNameMap } from './Utils/Networking';

import { ethers } from 'ethers';
import RouteView from './RouteView';

import '../scss/custom.scss';
import Footer from './Footer';

  /**
   * activeProfileName = 'Example';
   * profiles = {
   *   MetaMask: {
   *     walletAddresses: null,
   *     disabledProjects: {},
   *     isWeb3: true,
   *   },
   *   Example: {
   *     walletAddresses: {
   *       avalanche: [],
   *       ethereum: [],
   *       fantom: [],
   *       polygon: [],
   *     },
   *     disabledProjects: {
   *       avalanche: [],
   *       ethereum: [],
   *       fantom: [],
   *       polygon: [],
   *     },
   *     isWeb3: false,
   *   },
   * }
   *
   *  */

const Main = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['activeProfileName', 'profiles']);
  const [provider, setProvider] = useState();
  const [activeProfile, setActiveProfile] = useState();
  const [hasNoProfiles, setHasNoProfiles] = useState(false);

  if (!cookies.profiles) {
    cookies.profiles = {};
    setCookie('profiles', cookies.profiles);
  }

  const profileNames = useMemo(() => Object.keys(cookies.profiles), [cookies.profiles]);

  useEffect(() => {
    // If the active profile isn't set, or it is set to something that isn't in the profiles list,
    // and we have profiles in the list, we will change the active profile to the next in the list.
    if ((!cookies.activeProfileName || !profileNames.includes(cookies.activeProfileName))
      && cookies.profiles
      && Object.keys(cookies.profiles).length > 0
    ) {
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

  }, [cookies.activeProfileName, cookies.profiles, profileNames, setCookie]);

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
          ethereum: null,
          fantom: null,
          polygon: null,
        },
        networkName: null,
      };
      if (profile) {
        if (profile.isWeb3) {
          const ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any');
          try {
            await ethersProvider.send('eth_requestAccounts', []);
            ethersProvider.on('network', (newNetwork, oldNetwork) => {
              if (oldNetwork) {
                window.location.reload();
              }
            });
          } catch (e) {
            removeCookie('activeProfileName');
            delete cookies.profiles['_MetaMask'];
            setCookie('profiles', cookies.profiles);
            window.location.reload();
          }

          providerObj.ethers.signer = ethersProvider.getSigner();
          providerObj.ethers.web3 = ethersProvider;
          providerObj.networkName = networkIdToNameMap[(await ethersProvider.getNetwork()).chainId];
          providerObj.ethers.avalanche = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc');
          providerObj.ethers.ethereum = new ethers.providers.JsonRpcProvider('https://api.mycryptoapi.com/eth');
          providerObj.ethers.fantom = new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools/');
          providerObj.ethers.polygon = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');

        } else {
          if (profile.walletAddresses.avalanche.length > 0) {
            providerObj.ethers.avalanche = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc');
          }
          if (profile.walletAddresses.ethereum.length > 0) {
            providerObj.ethers.ethereum = new ethers.providers.JsonRpcProvider('https://api.mycryptoapi.com/eth');
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
  const onAboutPage = useMatch("about");
  const shouldRedirect = !onManageProfilesPage && !onAboutPage && hasNoProfiles;
  return (
    <Container>
      {shouldRedirect ? <Navigate to="/manage-profiles" replace /> : null}
      {
        (provider || onManageProfilesPage || onAboutPage)
          ? <RouteView profileName={cookies.activeProfileName} profile={activeProfile} provider={provider} />
          : null
      }
      <Footer />
    </Container>
  );
};

export default withCookies(Main);
