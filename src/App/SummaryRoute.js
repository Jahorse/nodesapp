import React, { useEffect, useRef, useState } from 'react';
import { useCustomEventListener } from 'react-custom-events';
import {
  Container,
} from 'reactstrap';
import NetworkTable from './NetworkTables/NetworkTable';
import {
  avalancheProtocols,
  cronosProtocols,
  ethereumProtocols,
  fantomProtocols,
  polygonProtocols,
  getProtocolProviders,
} from './Utils/protocols';

const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const selectNetworks = (providers) => {
  if (providers.web3) {
    return ['avalanche', 'cronos', 'ethereum', 'fantom', 'polygon'];
  }
  const networks = [];
  if (providers.avalanche) { networks.push('avalanche'); }
  if (providers.cronos) { networks.push('cronos'); }
  if (providers.ethereum) { networks.push('ethereum'); }
  if (providers.fantom) { networks.push('fantom'); }
  if (providers.polygon) { networks.push('polygon'); }

  return networks;
};

const Summary = (props) => {
  const [avalancheProviders, setAvalancheProviders] = useState([]);
  const [cronosProviders, setCronosProviders] = useState([]);
  const [ethereumProviders, setEthereumProviders] = useState([]);
  const [fantomProviders, setFantomProviders] = useState([]);
  const [polygonProviders, setPolygonProviders] = useState([]);

  const [hasAvalancheNodes, setHasAvalancheNodes] = useState(false);
  const [hasCronosNodes, setHasCronosNodes] = useState(false);
  const [hasEthereumNodes, setHasEthereumNodes] = useState(false);
  const [hasFantomNodes, setHasFantomNodes] = useState(false);
  const [hasPolygonNodes, setHasPolygonNodes] = useState(false);

  const [totalRewards, setTotalRewards] = useState(0);
  const [avalancheRewards, setAvalancheRewards] = useState(0);
  const avalancheRewardsUpdateRef = useRef(Promise.resolve());
  const [cronosRewards, setCronosRewards] = useState(0);
  const cronosRewardsUpdateRef = useRef(Promise.resolve());
  const [ethereumRewards, setEthereumRewards] = useState(0);
  const ethereumRewardsUpdateRef = useRef(Promise.resolve());
  const [fantomRewards, setFantomRewards] = useState(0);
  const fantomRewardsUpdateRef = useRef(Promise.resolve());
  const [polygonRewards, setPolygonRewards] = useState(0);
  const polygonRewardsUpdateRef = useRef(Promise.resolve());

  const networks = selectNetworks(props.provider.ethers);

  useEffect(() => {
    setTotalRewards(avalancheRewards + cronosRewards + ethereumRewards + fantomRewards + polygonRewards);
  }, [avalancheRewards, cronosRewards, ethereumRewards, fantomRewards, polygonRewards]);

  useCustomEventListener('avalanche-node', async p => {
    setHasAvalancheNodes( true );
    avalancheRewardsUpdateRef.current = avalancheRewardsUpdateRef.current
      .then(() => timeout(100)) // Delay just for effect
      .then(async () => {
        const rewards = await p.rewards;
        if (!isNaN(rewards)) {
          setAvalancheRewards(previousRewards => parseFloat((previousRewards + rewards).toFixed(2)));
        }
      });
  });
  useEffect(() => {
    if (networks.includes('avalanche') && avalancheProviders.length === 0) {
      setAvalancheProviders(
        getProtocolProviders(
          avalancheProtocols,
          props.provider,
          props.profile.walletAddresses.avalanche,
          props.profile.disabledProjects.avalanche,
        )
      );
    }
  }, [avalancheProviders, hasAvalancheNodes, networks, props.provider, props.profile]);
  useCustomEventListener('cronos-node', async p => {
    setHasCronosNodes( true );
    cronosRewardsUpdateRef.current = cronosRewardsUpdateRef.current
      .then(() => timeout(100)) // Delay just for effect
      .then(async () => {
        const rewards = await p.rewards;
        if (!isNaN(rewards)) {
          setCronosRewards(previousRewards => parseFloat((previousRewards + rewards).toFixed(2)));
        }
      });
  });
  useEffect(() => {
    if (networks.includes('cronos') && cronosProviders.length === 0) {
      setCronosProviders(
        getProtocolProviders(
          cronosProtocols,
          props.provider,
          props.profile.walletAddresses.cronos,
          props.profile.disabledProjects.cronos,
        )
      );
    }
  }, [cronosProviders, hasCronosNodes, networks, props.provider, props.profile]);
  useCustomEventListener('ethereum-node', async p => {
    setHasEthereumNodes( true );
    ethereumRewardsUpdateRef.current = ethereumRewardsUpdateRef.current
      .then(() => timeout(100)) // Delay just for effect
      .then(async () => {
        const rewards = await p.rewards;
        if (!isNaN(rewards)) {
          setEthereumRewards(previousRewards => parseFloat((previousRewards + rewards).toFixed(2)));
        }
      });
  });
  useEffect(() => {
    if (networks.includes('ethereum') && ethereumProviders.length === 0) {
      setEthereumProviders(
        getProtocolProviders(
          ethereumProtocols,
          props.provider,
          props.profile.walletAddresses.ethereum,
          props.profile.disabledProjects.ethereum,
        )
      );
    }
  }, [ethereumProviders, hasEthereumNodes, networks, props.provider, props.profile]);
  useCustomEventListener('fantom-node', async p => {
    setHasFantomNodes( true );
    fantomRewardsUpdateRef.current = fantomRewardsUpdateRef.current
      .then(() => timeout(100)) // Delay just for effect
      .then(async () => {
        const rewards = await p.rewards;
        if (!isNaN(rewards)) {
          setFantomRewards(previousRewards => parseFloat((previousRewards + rewards).toFixed(2)));
        }
      });
  });
  useEffect(() => {
    if (networks.includes('fantom') && fantomProviders.length === 0) {
      setFantomProviders(
        getProtocolProviders(
          fantomProtocols,
          props.provider,
          props.profile.walletAddresses.fantom,
          props.profile.disabledProjects.fantom,
        )
      );
    }
  }, [fantomProviders, hasFantomNodes, networks, props.provider, props.profile]);
  useCustomEventListener('polygon-node', async p => {
    setHasPolygonNodes( true );
    polygonRewardsUpdateRef.current = polygonRewardsUpdateRef.current
      .then(() => timeout(100)) // Delay just for effect
      .then(async () => {
        const rewards = await p.rewards;
        if (!isNaN(rewards)) {
          setPolygonRewards(previousRewards => parseFloat((previousRewards + rewards).toFixed(2)));
        }
      });
  });
  useEffect(() => {
    if (networks.includes('polygon') && polygonProviders.length === 0) {
      setPolygonProviders(
        getProtocolProviders(
          polygonProtocols,
          props.provider,
          props.profile.walletAddresses.polygon,
          props.profile.disabledProjects.polygon,
        )
      );
    }
  }, [polygonProviders, hasPolygonNodes, networks, props.provider, props.profile]);

  return (
    <Container fluid>
      <Container className='my-2 px-3 py-2 bg-info rounded'>
        <h2>Total Pending USD: ${parseFloat(totalRewards).toFixed(2)}</h2>
      </Container>
      {hasAvalancheNodes
        ? <NetworkTable
            profile={props.profile}
            provider={props.provider}
            networkName='Avalanche'
            walletAddresses={props.profile.walletAddresses.avalanche}
            protocolProviders={avalancheProviders}
            totalRewards={avalancheRewards}
          />
        : null
      }
      {hasCronosNodes
        ? <NetworkTable
            profile={props.profile}
            provider={props.provider}
            networkName='Cronos'
            walletAddresses={props.profile.walletAddresses.cronos}
            protocolProviders={cronosProviders}
            totalRewards={cronosRewards}
          />
        : null
      }
      {hasEthereumNodes
      ? <NetworkTable
          profile={props.profile}
          provider={props.provider}
          networkName='Ethereum'
          walletAddresses={props.profile.walletAddresses.ethereum}
          protocolProviders={ethereumProviders}
          totalRewards={ethereumRewards}
        />
        : null
      }
      {hasFantomNodes
      ? <NetworkTable
          profile={props.profile}
          provider={props.provider}
          networkName='Fantom'
          walletAddresses={props.profile.walletAddresses.fantom}
          protocolProviders={fantomProviders}
          totalRewards={fantomRewards}
        />
        : null
      }
      {hasPolygonNodes
        ? <NetworkTable
          profile={props.profile}
          provider={props.provider}
          networkName='Polygon'
          walletAddresses={props.profile.walletAddresses.polygon}
          protocolProviders={polygonProviders}
          totalRewards={polygonRewards}
        />
        : null
      }
    </Container>
  );
}

export default Summary;
