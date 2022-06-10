import Power from './PowerContract';

class PowerWind extends Power {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      'Wind',
      'FLATVERSAL',
    );
  }
}

export default PowerWind;
