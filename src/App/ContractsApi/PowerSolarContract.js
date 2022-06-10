import Power from './PowerContract';

class PowerSolar extends Power {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      'Solar',
      'MICROSCOPIC'
    );
  }
}

export default PowerSolar;
