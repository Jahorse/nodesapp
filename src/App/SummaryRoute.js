import React from 'react';
import {
  Container,
} from 'reactstrap';
import NetworkTable from './NetworkTables/NetworkTable';

const selectNetworks = (providers) => {
  if (providers.web3) {
    return ['avalanche', 'ethereum', 'fantom', 'polygon'];
  }
  const networks = [];
  if (providers.avalanche) { networks.push('avalanche'); }
  if (providers.ethereum) { networks.push('ethereum'); }
  if (providers.fantom) { networks.push('fantom'); }
  if (providers.polygon) { networks.push('polygon'); }

  return networks;
};

const Summary = (props) => {
  const networks = selectNetworks(props.provider.ethers);

  return (
    <Container fluid>
      {networks.includes('avalanche')
        ? <NetworkTable
            profile={props.profile}
            provider={props.provider}
            networkName='Avalanche'
            walletAddresses={props.profile.walletAddresses.avalanche}
          />
        : null
      }
      {networks.includes('ethereum')
      ? <NetworkTable
          profile={props.profile}
          provider={props.provider}
          networkName='Ethereum'
          walletAddresses={props.profile.walletAddresses.ethereum}
        />
        : null
      }
      {networks.includes('fantom')
      ? <NetworkTable
          profile={props.profile}
          provider={props.provider}
          networkName='Fantom'
          walletAddresses={props.profile.walletAddresses.fantom}
        />
        : null
      }
      {networks.includes('polygon')
        ? <NetworkTable
          profile={props.profile}
          provider={props.provider}
          networkName='Polygon'
          walletAddresses={props.profile.walletAddresses.polygon}
        />
        : null
      }
    </Container>
  );
}

export default Summary;
