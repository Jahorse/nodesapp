import React, { useEffect, useState } from 'react';
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
  const networks = selectNetworks(props.provider.ethers);

  useCustomEventListener('avalanche-node', _ => {
    setHasAvalancheNodes( true );
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
  useCustomEventListener('cronos-node', _ => {
    setHasCronosNodes( true );
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
  useCustomEventListener('ethereum-node', _ => {
    setHasEthereumNodes( true );
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
  useCustomEventListener('fantom-node', _ => {
    setHasFantomNodes( true );
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
  useCustomEventListener('polygon-node', _ => {
    setHasPolygonNodes( true );
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
      {hasAvalancheNodes
        ? <NetworkTable
            profile={props.profile}
            provider={props.provider}
            networkName='Avalanche'
            walletAddresses={props.profile.walletAddresses.avalanche}
            protocolProviders={avalancheProviders}
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
        />
        : null
      }
    </Container>
  );
}

export default Summary;
