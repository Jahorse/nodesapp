import ThorContract from './ThorContract';

class ThorHeimdallContract extends ThorContract {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0xba4400c4619cd15267c2fecd4dbc39d310cee3f1',
      'Heimdall');
  }
}

export default ThorHeimdallContract;
