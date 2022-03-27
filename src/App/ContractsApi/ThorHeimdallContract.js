import Thor from './ThorContract';

class ThorHeimdall extends Thor {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0xba4400c4619cd15267c2fecd4dbc39d310cee3f1',
      'Heimdall',
      156);
  }
}

export default ThorHeimdall;
