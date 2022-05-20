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

import { networkIdToNameMap } from './Utils/networking';

import { ethers } from 'ethers';
import RouteView from './RouteView';

import '../scss/custom.scss';
import Footer from './Footer';

  /**
   * activeProfileName = 'MyProfile';
   * profiles = {
   *   _MetaMask: {
   *     walletAddresses: null,
   *     disabledProjects: {},
   *     isWeb3: true,
   *   },
   *   MyProfile: {
   *     walletAddresses: {
   *       avalanche: [],
   *       cronos: []
   *       ethereum: [],
   *       fantom: [],
   *       polygon: [],
   *     },
   *     disabledProjects: {
   *       avalanche: [],
   *       cronos: [],
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

    } else {
      if (cookies.activeProfileName && cookies.profiles[cookies.activeProfileName]) {
        setActiveProfile(cookies.profiles[cookies.activeProfileName]);
      }
    }
  }, [cookies.activeProfileName, cookies.profiles, profileNames, setCookie]);

  useEffect(() => {
    const getProvider = async () => {
      let profile;
      if (cookies.activeProfileName) {
        profile = cookies.profiles[cookies.activeProfileName];

        ['avalanche', 'cronos', 'ethereum', 'fantom', 'polygon'].forEach(n => {
          if (!Object.prototype.hasOwnProperty.call(profile.walletAddresses, n)) {
            profile.walletAddresses[n] = [];

            if (!Object.prototype.hasOwnProperty.call(profile.disabledProjects, n)) {
              profile.disabledProjects[n] = [];
            }

            cookies.profiles[cookies.activeProfileName] = profile;
            setCookie('profiles', cookies.profiles);
          }
        });
      }

      let providerObj = {
        ethers: {
          web3: null,
          signer: null,
          avalanche: null,
          cronos: null,
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
          providerObj.ethers.cronos = new ethers.providers.JsonRpcProvider('https://evm-cronos.crypto.org/');
          providerObj.ethers.ethereum = new ethers.providers.JsonRpcProvider('https://mainnet.strongblock.com/6bfddc9eaaa3715b2e35cb2546a05acabf5b421c');
          providerObj.ethers.fantom = new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools/');
          providerObj.ethers.polygon = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');

        } else {
          if (profile.walletAddresses.avalanche.length > 0) {
            providerObj.ethers.avalanche = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc');
          }
          if (profile.walletAddresses.cronos.length > 0) {
            providerObj.ethers.cronos = new ethers.providers.JsonRpcProvider('https://evm-cronos.crypto.org/');
          }
          if (profile.walletAddresses.ethereum.length > 0) {
            providerObj.ethers.ethereum = new ethers.providers.JsonRpcProvider('https://mainnet.strongblock.com/6bfddc9eaaa3715b2e35cb2546a05acabf5b421c');
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
  }, [activeProfile, cookies.activeProfileName, cookies.profiles, removeCookie, setCookie]);


  const onManageProfilesPage = useMatch("manage-profiles");
  const onSecurityPage = useMatch("security");
  const onProtocolsPage = useMatch("protocols");
  const onNonProfilePage = (onManageProfilesPage || onSecurityPage || onProtocolsPage);
  const shouldRedirect = !onNonProfilePage && Object.keys(cookies.profiles).length === 0;

  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-7LW4M4X86F');
  if (onManageProfilesPage) {
    gtag('set', 'page_path', '/manage-profiles');
  } else if (onSecurityPage) {
    gtag('set', 'page_path', '/security');
  } else if (onProtocolsPage) {
    gtag('set', 'page_path', '/protocols');
  } else {
    gtag('set', 'page_path', '/');
  }
  gtag('event', 'page_view');

  return (
    <Container>
      {shouldRedirect ? <Navigate to="/manage-profiles" replace /> : null}
      {
        (provider || onNonProfilePage)
          ? <RouteView profileName={cookies.activeProfileName} profile={activeProfile} provider={provider} />
          : null
      }
      <Footer />
    </Container>
  );
};

export default withCookies(Main);
